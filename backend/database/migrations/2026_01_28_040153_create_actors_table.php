<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('actors', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->string('name', 100);
            $table->enum('gender', ['male', 'female']);
            $table->integer('age');
            $table->string('photo_url', 500)->nullable();
            $table->text('bio')->nullable();
            $table->text('experience')->nullable();
            $table->timestamps();

            $table->index('gender');
            $table->index('age');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('actors');
    }
};
