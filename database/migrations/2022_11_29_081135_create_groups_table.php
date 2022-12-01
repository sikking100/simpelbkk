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
    public function up()
    {
        Schema::create('groups', function (Blueprint $table) {
            $table->id();
            $table->string('image', 100)->nullable();
            $table->string('name', 100);
            $table->foreignId('category_id')->constrained()->onUpdate('cascade')->onDelete('cascade');
            $table->foreignId('type_of_action_id')->constrained()->onUpdate('cascade')->onDelete('cascade');
            $table->text('profil');
            $table->text('address');
            $table->text('description');
            $table->string('npwp', 100);
            $table->string('phone', 100);
            $table->string('proposal', 100);
            $table->string('email')->nullable();
            $table->date('date');
            $table->foreignId('user_id')->constrained()->onUpdate('cascade')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('groups');
    }
};
