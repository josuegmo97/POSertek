<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Categoria;

class CategoriaController extends Controller
{
    /**
     * Muestra Todas las Categorias
     *
     * @return [json] categoria object
     */
    public function index()
    {
        
        $data = Categoria::all();

        return response()->json(
            [
                'code' => '1000',
                'data' => $data,
                'message' => 'Successfully'
            ]
        );
    }

   
    /**
     * Creacion de Categoria
     *
     * @param  [string] categoria
     * @param  [string] cod_categoria
     * @param  [string] descripcion
     * @param  [boolean] sub_categoria
     * @param  [integer] cat_principal
     * 
     * @return [string] message
     */
    public function store(Request $request)
    {
        //dd($request->all());
        $categoria = new Categoria();
        $categoria->categoria = $request->categoria;
        $categoria->cod_categoria = $request->cod_categoria;
        $categoria->descripcion = $request->descripcion;
        $categoria->sub_categoria = $request->sub_categoria;
        if ($request->cat_principal) {
            $categoria->cat_principal = $request->cat_principal;
        }

        if ($categoria->save()) {
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
     * @param  [integer] id_categoria
     * @param  [string] categoria
     * @param  [string] cod_categoria
     * @param  [string] descripcion
     * @param  [boolean] sub_categoria
     * @param  [integer] cat_principal
     * 
     * @return [string] message
     */
    public function update(Request $request)
    {
        //dd($request->all());
        $categoria = Categoria::find($request->id_categoria);
            if ($categoria) {
                $categoria->categoria = $request->categoria;
                $categoria->cod_categoria = $request->cod_categoria;
                $categoria->descripcion = $request->descripcion;
                $categoria->sub_categoria = $request->sub_categoria;
                if ($request->cat_principal) {
                    $categoria->cat_principal = $request->cat_principal;
                }

                if ($categoria->save()) {
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
    public function destroy($id)
    {
        //
    }
}
