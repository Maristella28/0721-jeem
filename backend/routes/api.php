<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\ResidentProfileController;
use App\Http\Controllers\AnnouncementController;
use App\Http\Controllers\ResidentController;
use App\Http\Controllers\AssetController;
use App\Http\Controllers\AssetRequestController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\BlotterRequestController;
use App\Http\Controllers\BlotterRecordsController;

/*
|--------------------------------------------------------------------------
| Public API Routes (No Authentication Required)
|--------------------------------------------------------------------------
*/

// 🔐 Authentication
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']); // Returns Bearer token

// 🔐 New Verification Code Routes
Route::post('/verify-registration', [AuthController::class, 'verifyRegistration']);
Route::post('/resend-verification-code', [AuthController::class, 'resendVerificationCode']);

// Test route for debugging
Route::post('/test-register', function(Request $request) {
    \Log::info('Test registration attempt:', $request->all());
    return response()->json([
        'message' => 'Test registration received',
        'data' => $request->all()
    ]);
});

// Debug registration validation
Route::post('/debug-register', function(Request $request) {
    \Log::info('Debug registration attempt:', $request->all());
    
    try {
        $validated = $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|string|email|unique:users',
            'password' => 'required|string|min:8',
            'role'     => 'nullable|string|in:admin,staff,treasurer,residents',
        ]);
        
        return response()->json([
            'message' => 'Validation passed',
            'validated' => $validated
        ]);
    } catch (\Illuminate\Validation\ValidationException $e) {
        return response()->json([
            'message' => 'Validation failed',
            'errors' => $e->errors(),
            'request_data' => $request->all()
        ], 422);
    }
});

// 📧 Email Verification Routes (Legacy - keeping for compatibility)
Route::get('/email/verify/{id}/{hash}', [AuthController::class, 'verifyEmail'])->name('verification.verify');
Route::post('/email/resend', [AuthController::class, 'resendVerification'])->name('verification.resend');

// 📢 Public Announcements (only "posted" shown to guests)
Route::get('/announcements', [AnnouncementController::class, 'index']);

// 🆔 Fetch individual user (used in modal selection)
Route::get('/user/{id}', function ($id) {
    $user = \App\Models\User::find($id);
    if (!$user) {
        return response()->json(['message' => 'User not found'], 404);
    }
    return response()->json(['user' => $user]);
});

/*
|--------------------------------------------------------------------------
| Protected API Routes (Authenticated via Sanctum)
|--------------------------------------------------------------------------
*/
Route::middleware(['auth:sanctum', 'throttle:200,1'])->group(function () {

    // 🔒 Authenticated user endpoints
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', fn(Request $request) => response()->json($request->user()));
    Route::get('/profile', [ResidentProfileController::class, 'show']);

    // ✅ Mark user as having logged in
    Route::patch('/user/update-login-status', function (Request $request) {
        $user = $request->user();
        $user->has_logged_in = true;
        $user->save();

        return response()->json(['message' => 'Login status updated']);
    });

    /*
    |--------------------------------------------------------------------------
    | Admin-Only Routes
    |--------------------------------------------------------------------------
    */
    Route::middleware('admin')->prefix('admin')->group(function () {

        // 🧑‍💼 User management
        Route::post('/register', [AuthController::class, 'register']);
        Route::delete('/user/{id}', [AuthController::class, 'deleteUser']);

        // 📊 Dashboard summary
        Route::get('/dashboard', [AdminController::class, 'index']);

        // 👥 Residents list
        Route::get('/residents', [ResidentProfileController::class, 'index']);
        Route::get('/residents/{id}', [ResidentProfileController::class, 'showById']);
        Route::put('/residents/{id}', [ResidentController::class, 'update']); // Admin update

        // 📢 Announcements full CRUD
        Route::get('/announcements', [AnnouncementController::class, 'index']); // Admin can see all announcements
        Route::apiResource('/announcements', AnnouncementController::class)->except(['index']);
        Route::patch('/announcements/{announcement}/toggle', [AnnouncementController::class, 'toggleStatus']);

        // 🔍 Users without existing profiles
        Route::get('/users-without-profiles', [AdminController::class, 'usersWithoutProfiles']);

        // ✅ Check if user already has a profile
        Route::get('/users/{id}/has-profile', function ($id) {
            $user = \App\Models\User::with('profile')->find($id);
            if (!$user) {
                return response()->json(['message' => 'User not found.'], 404);
            }
            return response()->json(['exists' => $user->profile !== null]);
        });
    });

    /*
    |--------------------------------------------------------------------------
    | Shared Authenticated Routes
    |--------------------------------------------------------------------------
    */

    // 👤 Resident: Own profile
    Route::prefix('profile')->group(function () {
        Route::get('/', [ResidentProfileController::class, 'show']);
        Route::match(['post', 'put'], '/update', [ResidentProfileController::class, 'update']);
    });

    // 🆕 Resident: Complete first-time profile (Authenticated only)
    Route::post('/residents/complete-profile', [ResidentProfileController::class, 'store']);

    // 🧾 Authenticated users (incl. admin): Read residents
    Route::get('/residents', [ResidentProfileController::class, 'index']);
    Route::get('/residents/{id}', [ResidentProfileController::class, 'showById']);

    // 🔔 Notifications
    Route::get('/notifications', function (Request $request) {
        // Return notifications for the authenticated user
        return response()->json([
            'notifications' => $request->user()->notifications
        ]);
    });
    Route::patch('/notifications/{id}/read', [NotificationController::class, 'markAsRead']);

    // Assets
    Route::get('/assets', [AssetController::class, 'index']);
    Route::post('/assets', [AssetController::class, 'store']); // admin
    Route::patch('/assets/{id}', [AssetController::class, 'update']); // admin
    Route::get('/assets/{id}', [AssetController::class, 'show']);

    // Asset Requests
    Route::post('/assets/request', [AssetRequestController::class, 'store'])
        ->middleware('throttle:100,1'); // 100 requests per minute for dev
    Route::get('/asset-requests', [AssetRequestController::class, 'index']);
    Route::patch('/asset-requests/{id}', [AssetRequestController::class, 'update']); // admin
    Route::post('/asset-requests/{id}/pay', [AssetRequestController::class, 'processPayment']); // Process payment
    Route::delete('/asset-requests/{id}', [AssetRequestController::class, 'destroy']);
    Route::get('/asset-requests/{id}', [AssetRequestController::class, 'show']);

    // Blotter Requests
    Route::post('/blotter-requests', [BlotterRequestController::class, 'store']);
});

Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::get('/admin/blotter-requests', [BlotterRequestController::class, 'index']);
    Route::patch('/blotter-requests/{id}', [BlotterRequestController::class, 'update']);
});

Route::middleware(['auth:sanctum'])->get('/blotter-requests', [BlotterRequestController::class, 'myRequests']);
Route::get('/blotter-records', [BlotterRecordsController::class, 'index']);
Route::get('/blotter-records/{id}', [BlotterRecordsController::class, 'show']);
Route::post('/blotter-records', [BlotterRecordsController::class, 'store']);
