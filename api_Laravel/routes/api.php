<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group([
    'prefix' => 'auth'
], function () {
    Route::post('login', 'AuthController@login');
    Route::post('signup', 'AuthController@signUp');

    Route::group([
      'middleware' => 'auth:api'
    ], function() {
        Route::get('logout', 'AuthController@logout');
        Route::get('user', 'AuthController@user');
    });
});

Route::group([
    'prefix' => 'categoria'
], function () {
    Route::group([
        'middleware' => 'auth:api'
      ], function() {
          Route::get('index', 'CategoriaController@index');
          Route::post('create', 'CategoriaController@store');
          Route::post('update', 'CategoriaController@update');
      });
});

Route::group([
    'prefix' => 'marca'
], function () {
    Route::group([
        'middleware' => 'auth:api'
      ], function() {
          Route::get('index', 'MarcaController@index');
          Route::post('create', 'MarcaController@store');
          Route::post('update', 'MarcaController@update');
      });
});

Route::group([
    'prefix' => 'variaciones'
], function () {
    Route::group([
        'middleware' => 'auth:api'
      ], function() {
          Route::get('index', 'VariacionesController@index');
          Route::post('create', 'VariacionesController@store');
          Route::post('update', 'VariacionesController@update');
      });
});