<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration {
    public function up()
    {
        DB::statement("ALTER TABLE residents CHANGE mobile_number contact_number VARCHAR(255)");
    }

    public function down()
    {
        DB::statement("ALTER TABLE residents CHANGE contact_number mobile_number VARCHAR(255)");
    }
};
