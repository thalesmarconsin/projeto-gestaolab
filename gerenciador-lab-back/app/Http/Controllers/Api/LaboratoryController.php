<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Laboratory;
use Illuminate\Support\Facades\Validator;

class LaboratoryController extends Controller
{
    public function index()
    {
        return response()->json([
            'laboratorios' => Laboratory::all(),
            'status' => 200
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nome' => 'required|string|max:255',
            'localizacao' => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'mensagem' => 'Erro na validação dos dados',
                'erros' => $validator->errors(),
                'status' => 400
            ], 400);
        }

        $lab = Laboratory::create($request->all());

        return response()->json([
            'mensagem' => 'Laboratório cadastrado com sucesso',
            'laboratorio' => $lab,
            'status' => 201
        ], 201);
    }

    public function show($id)
    {
        $lab = Laboratory::find($id);

        if (!$lab) {
            return response()->json([
                'mensagem' => 'Laboratório não encontrado',
                'status' => 404
            ], 404);
        }

        return response()->json([
            'laboratorio' => $lab,
            'status' => 200
        ]);
    }

    public function update(Request $request, $id)
    {
        $lab = Laboratory::find($id);

        if (!$lab) {
            return response()->json([
                'mensagem' => 'Laboratório não encontrado',
                'status' => 404
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'nome' => 'required|string|max:255',
            'localizacao' => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'mensagem' => 'Erro na validação dos dados',
                'erros' => $validator->errors(),
                'status' => 400
            ], 400);
        }

        $lab->update($request->all());

        return response()->json([
            'mensagem' => 'Laboratório atualizado com sucesso',
            'laboratorio' => $lab,
            'status' => 200
        ]);
    }

    public function destroy($id)
    {
        $lab = Laboratory::find($id);

        if (!$lab) {
            return response()->json([
                'mensagem' => 'Laboratório não encontrado',
                'status' => 404
            ], 404);
        }

        $lab->delete();

        return response()->json([
            'mensagem' => 'Laboratório removido com sucesso',
            'status' => 200
        ]);
    }
}
