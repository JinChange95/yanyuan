<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ActorController;
use App\Http\Controllers\Api\NewsController;
use App\Http\Controllers\Api\RequirementController;
use App\Http\Controllers\Api\PosterController;

Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->get('/auth/me', [AuthController::class, 'me']);

Route::get('/actors', [ActorController::class, 'index']);
Route::get('/actors/{actor}', [ActorController::class, 'show']);
Route::post('/actors', [ActorController::class, 'store']);
Route::middleware('auth:sanctum')->put('/actors/{actor}', [ActorController::class, 'update']);
Route::middleware('auth:sanctum')->delete('/actors/{actor}', [ActorController::class, 'destroy']);

Route::get('/news', [NewsController::class, 'index']);
Route::get('/news/{news}', [NewsController::class, 'show']);
Route::middleware('auth:sanctum')->post('/news', [NewsController::class, 'store']);
Route::middleware('auth:sanctum')->put('/news/{news}', [NewsController::class, 'update']);
Route::middleware('auth:sanctum')->delete('/news/{news}', [NewsController::class, 'destroy']);

Route::get('/requirements', [RequirementController::class, 'index']);
Route::post('/requirements', [RequirementController::class, 'store']);
Route::middleware('auth:sanctum')->delete('/requirements/{requirement}', [RequirementController::class, 'destroy']);

Route::get('/posters', [PosterController::class, 'index']);
Route::middleware('auth:sanctum')->post('/posters', [PosterController::class, 'store']);
Route::middleware('auth:sanctum')->put('/posters/{poster}', [PosterController::class, 'update']);
Route::middleware('auth:sanctum')->delete('/posters/{poster}', [PosterController::class, 'destroy']);
