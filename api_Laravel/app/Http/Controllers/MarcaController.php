<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Marca;

class MarcaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = Marca::all();

        return response()->json(
            [
                'code' => '1000',
                'data' => $data,
                'message' => 'Successfully'
            ]
        );
    }

    /**
     * Creacion de Marcas
     *
     * @param  [string] marca
     * @param  [string] descripcion
     * @param  [boolean] sub_categoria
     * @param  [integer] cat_principal
     * 
     * @return [string] message
     */
    public function store(Request $request)
    {
        //dd($request->all());
        $marca = new Marca();
        $marca->marca = $request->marca;
        $marca->descripcion = $request->descripcion;

        if ($marca->save()) {
            return response()->json(
                [
                    'code' => '1000',
                    //'data' => $data,
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

    /**
     * Edicion de Categoria
     *
     * @param  [integer] id_marca
     * @param  [string] marca
     * @param  [string] descripcion
     * 
     * @return [string] message
     */
    public function update(Request $request)
    {
        //dd($request->all());
        $marca = Marca::find($request->id_marca);
            if ($marca) {
                $marca->marca = $request->marca;
                $marca->descripcion = $request->descripcion;

                if ($marca->save()) {
                    return response()->json(
                        [
                            'code' => '1000',
                            //'data' => $data,
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
    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function delete(Request $request)
    {
        //dd($request->all());
        $marca = Marca::find($request->id_marca);
            if ($marca) {
                $marca->delete();
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
