<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('requirements', function (Blueprint $table) {
            $table->id();
            $table->string('project_name', 200);
            $table->integer('actor_count');
            $table->enum('gender', ['male', 'female', 'any'])->default('any');
            $table->enum('age_group', ['under12', '12-20', '30-50', 'over50', 'any'])->default('any');
            $table->string('contact_info', 200);
            $table->enum('status', ['pending', 'contacted', 'completed'])->default('pending');
            $table->timestamps();

            $table->index('status');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('requirements');
    }
};
