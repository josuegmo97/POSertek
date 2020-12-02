<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Variaciones;
use App\ValorVariaciones;

class VariacionesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $variaciones = Variaciones::all();
        foreach ($variaciones as $value) {
            $v['id'] = $value->id;
            $v['descripcion'] = $value->descripcion;
            $v['valores'] = $this->valoresIndex($value->id);
            $v['created_at'] = $value->created_at;
            $v['updated_at'] = $value->updated_at;
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
    
    function valoresIndex($idValores){
        $valorVariaciones = ValorVariaciones::where('variacion_id',$idValores)->get();
        $data=[];
        foreach ($valorVariaciones as $value) {
            $v['id'] = $value->id;
            $v['descripcion'] = $value->descripcion;
            $data[] = $v;
        }
        return $data;
    }

    /**
     * Creacion de Variaciones
     *
     * @param  [string] descripcion
     * @param  [array] valores
     * 
     * @return [string] message
     */
    public function store(Request $request)
    {
        //dd($request->all());
        $valid = Variaciones::where('descripcion',$request->descripcion)->first();
                
        if (!$valid) {
            $variaciones = new Variaciones();
            $variaciones->descripcion = $request->descripcion;

            if ($variaciones->save()) {
                if($request->valores && count($request->valores)>0){
                    foreach ($request->valores as $value) {
                        $valores = new ValorVariaciones();
                        $valores->variacion_id = $variaciones->id;
                        $valores->descripcion = $value;
                        $valores->save();
                    }
                    if ($valores->save()) {
                        return response()->json(
                            [
                                'code' => '1000',
                                //'data' => $data,
                                'message' => 'Ha sido creado satisfactoriamente'
                            ]
                        );
                    }
                }
                return response()->json(
                    [
                        'code' => '1001',
                        //'data' => $data,
                        'error' => 'Algo ha ocurrido'
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

        return response()->json(
            [
                'code' => '1002',
                //'data' => $data,
                'info' => 'La data ya Existe'
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

        $variacion = Variaciones::find($request->id_variacion);
        $variacion->descripcion = $request->descripcion;

        if ($variacion->save()) {
                if($request->valores && count($request->valores)>0){
                    foreach ($request->valores as $value) {
                        $valores =ValorVariaciones::find($value['id']);
                        $valores->descripcion = $value['descripcion'];
                        $valores->save();
                    }
                    if ($valores->save()) {
                        return response()->json(
                            [
                                'code' => '1000',
                                //'data' => $data,
                                'message' => 'Ha sido editado satisfactoriamente'
                            ]
                        );
                    }
                }
                return response()->json(
                    [
                        'code' => '1001',
                        //'data' => $data,
                        'error' => 'Algo ha ocurrido'
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
