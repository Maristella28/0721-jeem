<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up()
    {
        // Step 1: Add the new column
        Schema::table('residents', function (Blueprint $table) {
            $table->string('full_address')->nullable()->after('current_address');
        });

        // Step 2: Copy data AFTER column exists
        DB::statement('UPDATE residents SET full_address = current_address');

        // Step 3: Drop the old column
        Schema::table('residents', function (Blueprint $table) {
            $table->dropColumn('current_address');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        // Step 1: Re-add old column
        Schema::table('residents', function (Blueprint $table) {
            $table->string('current_address')->nullable()->after('full_address');
        });

        // Step 2: Restore data
        DB::statement('UPDATE residents SET current_address = full_address');

        // Step 3: Drop new column
        Schema::table('residents', function (Blueprint $table) {
            $table->dropColumn('full_address');
        });
    }
};
