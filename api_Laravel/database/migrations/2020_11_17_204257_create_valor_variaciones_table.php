<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateValorVariacionesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('valor_variaciones', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('variacion_id');
            $table->string('descripcion');
            $table->timestamps();

            $table->foreign('variacion_id')->references('id')->on('variaciones')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('valor_variaciones');
    }
}
