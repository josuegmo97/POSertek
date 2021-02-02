<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Producto;
use App\Stock;

class ProductosController extends Controller
{
    public function index(){

        $data = Producto::all();
        
        return response()->json(
            [
                'code' => '1000',
                'data' => $data,
                'message' => 'Successfully'
            ]
        );
    }

    /**
     * Creacion de Productos
     *
     * @param  [string] nombre
     * @param  [string] sku
     * @param  [string] tipo_codigo
     * @param  [integer] unidad_id
     * @param  [integer] marca_id
     * @param  [integer] categoria_id
     * @param  [integer] subcategoria_id
     * @param  [integer] cantidad_alerta
     * @param  [longtext] imagen
     * @param  [text] descripcion
     * @param  [boolean] vender
     * @param  [decimal] impuesto_noincluido
     * @param  [decimal] impuesto_incluido
     * @param  [decimal] margen
     * @param  [decimal] excluyendo_impuesto
     * 
     * @return [string] message
     */
    public function store(Request $request){

        $productos = new Producto();
        $productos->nombre = $request->nombre;
        $productos->sku = $request->sku;
        $productos->tipo_codigo = $request->tipo_codigo;
        $productos->unidad_id = $request->unidad_id;
        $productos->marca_id = $request->marca_id;
        $productos->categoria_id = $request->categoria_id;
        $productos->subcategoria_id = $request->subcategoria_id;
        $productos->cantidad_alerta = $request->cantidad_alerta;
        $productos->imagen = $request->imagen;
        $productos->descripcion = $request->descripcion;
        $productos->vender = $request->vender;
        $productos->impuesto_noincluido = $request->impuesto_noincluido;
        $productos->impuesto_incluido = $request->impuesto_incluido;
        $productos->margen = $request->margen;
        $productos->excluyendo_impuesto = $request->excluyendo_impuesto;

        if ($productos->save()) {
            return response()->json(
                [
                    'code' => '1000',
                    'data' => $productos,
                    'message' => 'Ha sido creado satisfactoriamente'
                ]
            );
        }

        return response()->json(
            [
                'code' => '1001',
                //'data' => $data,
                'error' => 'Algo ha ocurrido'
            ]
        );
    }

    public function update(Request $request){

        $productos = Producto::find($request->id_producto);
        //dd($request->all());
        if ($productos) {
            $productos->nombre = $request->nombre;
            $productos->sku = $request->sku;
            $productos->tipo_codigo = $request->tipo_codigo;
            $productos->unidad_id = $request->unidad_id;
            $productos->marca_id = $request->marca_id;
            $productos->categoria_id = $request->categoria_id;
            $productos->subcategoria_id = $request->subcategoria_id;
            $productos->cantidad_alerta = $request->cantidad_alerta;
            $productos->imagen = $request->imagen;
            $productos->descripcion = $request->descripcion;
            $productos->vender = $request->vender;
            $productos->impuesto_noincluido = $request->impuesto_noincluido;
            $productos->impuesto_incluido = $request->impuesto_incluido;
            $productos->margen = $request->margen;
            $productos->excluyendo_impuesto = $request->excluyendo_impuesto;

            if ($productos->save()) {
                return response()->json(
                    [
                        'code' => '1000',
                        //'data' => $productos,
                        'message' => 'Ha sido modificado satisfactoriamente'
                    ]
                );
            }
        }else{
            return response()->json(
                [
                    'code' => '1003',
                    //'data' => $data,
                    'info' => 'La data solicitada no Existe'
                ]
            );
        }

        return response()->json(
            [
                'code' => '1001',
                //'data' => $data,
                'error' => 'Algo ha ocurrido'
            ]
        );
    }

    public function stock(Request $request){
        $producto = Producto::find($request->id_producto);
        if ($producto) {
            $stock = Stock::where('producto_id',$request->id_producto)->first();
            //dd($stock);
            if ($stock) {
                $stock->cantidad = $request->cantidad;
                $stock->costo_unitario = $request->costo_unitario;
                $stock->save();

                return response()->json(
                    [
                        'code' => '1000',
                        'data' => $stock,
                        'message' => 'Ha sido modificado satisfactoriamente'
                    ]
                );
            }else{
                $stock = new Stock();
                $stock->producto_id = $request->id_producto;
                $stock->cantidad = $request->cantidad;
                $stock->costo_unitario = $request->costo_unitario;
                $stock->save();

                return response()->json(
                    [
                        'code' => '1000',
                        'data' => $stock,
                        'message' => 'Ha sido creado satisfactoriamente'
                    ]
                );
            }
        }else{
            return response()->json(
                [
                    'code' => '1003',
                    //'data' => $data,
                    'info' => 'La data solicitada no Existe'
                ]
            );
        }

        return response()->json(
            [
                'code' => '1001',
                //'data' => $data,
                'error' => 'Algo ha ocurrido'
            ]
        );
    }

    public function delete(Request $request){
        $producto = Producto::find($request->id_producto);
            if ($producto) {
                $producto->delete();
                return response()->json(
                    [
                        'code' => '1000',
                        //'data' => $data,
                        'message' => 'Ha sido eliminado satisfactoriamente'
                    ]
                );
            }else{
                return response()->json(
                    [
                        'code' => '1003',
                        //'data' => $data,
                        'info' => 'La data solicitada no Existe'
                    ]
                );
            }
        
        return response()->json(
            [
                'code' => '1001',
                //'data' => $data,
                'error' => 'Algo ha ocurrido'
            ]
        );
    }
}
