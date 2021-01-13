<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('productos', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->string('sku')->nullable();
            $table->string('tipo_codigo');
            $table->unsignedBigInteger('unidad_id');
            $table->unsignedBigInteger('marca_id')->nullable();
            $table->unsignedBigInteger('categoria_id')->nullable();
            $table->unsignedBigInteger('subcategoria_id')->nullable();
            $table->integer('cantidad_alerta')->nullable();
            $table->longText('imagen')->nullable();
            $table->text('descripcion')->nullable();
            $table->boolean('vender')->default(true);
            $table->double('impuesto_noincluido',20, 2);
            $table->double('impuesto_incluido',20, 2);
            $table->double('margen',20, 2)->nullable();
            $table->double('excluyendo_impuesto',20, 2)->nullable();
            $table->timestamps();

            $table->foreign('unidad_id')->references('id')->on('unidades')->onDelete('cascade');
            $table->foreign('marca_id')->references('id')->on('marcas')->onDelete('cascade');
            $table->foreign('categoria_id')->references('id')->on('categorias')->onDelete('cascade');
            $table->foreign('subcategoria_id')->references('id')->on('categorias')->onDelete('cascade');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('productos');
    }
}
