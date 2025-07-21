<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class RenameCurrentPhotoToAvatarInResidentsTable extends Migration
{
    public function up()
    {
        DB::statement("ALTER TABLE residents CHANGE current_photo avatar VARCHAR(255) NULL");
    }

    public function down()
    {
        DB::statement("ALTER TABLE residents CHANGE avatar current_photo VARCHAR(255) NULL");
    }
}
