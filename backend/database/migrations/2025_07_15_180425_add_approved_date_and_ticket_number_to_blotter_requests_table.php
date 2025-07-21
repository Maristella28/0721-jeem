<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('blotter_requests', function (Blueprint $table) {
            $table->timestamp('approved_date')->nullable();
            $table->string('ticket_number')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('blotter_requests', function (Blueprint $table) {
            $table->dropColumn('approved_date');
            $table->dropColumn('ticket_number');
        });
    }
};
