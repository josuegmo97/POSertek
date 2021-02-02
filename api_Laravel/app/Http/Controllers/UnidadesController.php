<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Unidades;

class UnidadesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
        {
        $data =[];
        $unidades = Unidades::all();

        foreach ($unidades as $value) {
            $v['id'] = $value->id;
            $v['nombre'] = $value->nombre;
            $v['nombre_corto'] = $value->nombre_corto;
            $v['decimal'] = $value->decimal;
            $v['sub_unidad'] = $value->sub_unidad;
            $v['equivalencia'] = $value->equivalencia;
            $v['unid_principal'] = $value->unid_principal;
            if ($value->unid_principal) {
                $principal = Unidades::find($value->unid_principal);
                $v['nombre_unid_principal'] = $principal->nombre;
            }

            $data[] = $v;
        }

        return response()->json(
            [
                'code' => '1000',
                'data' => $data,
                'message' => 'Successfully'
            ]
        );
    }

    /**
     * Creacion de Unidades
     *
     * @param  [string] nombre
     * @param  [string] nombre_corto
     * @param  [boolean] decimal
     * @param  [boolean] sub_unidad
     * @param  [integer] equivalencia
     * @param  [integer] unid_principal
     * 
     * @return [string] message
     */
    public function store(Request $request)
    {
        //dd($request->all());
        $unidades = new Unidades();
        $unidades->nombre = $request->nombre;
        $unidades->nombre_corto = $request->nombre_corto;
        $unidades->decimal = $request->decimal;
        $unidades->sub_unidad = $request->sub_unidad;
        if ($request->sub_unidad == true) {
            $unidades->equivalencia = $request->equivalencia;
            $unidades->unid_principal = $request->unid_principal;
        }

        if ($unidades->save()) {
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
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $unidades = Unidades::find($request->id_unidad);
            if ($unidades) {
                $unidades->nombre = $request->nombre;
                $unidades->nombre_corto = $request->nombre_corto;
                $unidades->decimal = $request->decimal;
                $unidades->sub_unidad = $request->sub_unidad;
                if ($request->sub_unidad == true) {
                    $unidades->equivalencia = $request->equivalencia;
                    $unidades->unid_principal = $request->unid_principal;
                }else{
                    $unidades->equivalencia = null;
                    $unidades->unid_principal = null;
                }

                if ($unidades->save()) {
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

    public function delete(Request $request)
    {
        $unidades = Unidades::find($request->id_unidad);
            if ($unidades) {
                $unidades->delete();
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
