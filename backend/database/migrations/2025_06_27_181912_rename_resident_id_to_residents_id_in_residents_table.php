<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
public function up(): void
{
    DB::statement("ALTER TABLE residents CHANGE resident_id residents_id VARCHAR(255) UNIQUE");
}

public function down(): void
{
    DB::statement("ALTER TABLE residents CHANGE residents_id resident_id VARCHAR(255) UNIQUE");
}
};
