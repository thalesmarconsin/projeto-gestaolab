<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Computers;
use Illuminate\Support\Facades\Validator;

class ComputerController extends Controller
{
    public function index()
    {
        $computers = Computers::with('laboratorio')->get();

        return response()->json([
            'computadores' => $computers,
            'status' => 200
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nome' => 'required|string|max:255',
            'patrimonio' => 'required|string|unique:computers',
            'retirado' => 'boolean',
            'laboratory_id' => 'required|exists:laboratories,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'mensagem' => 'Erro na validação dos dados',
                'erros' => $validator->errors(),
                'status' => 400
            ], 400);
        }

        $computer = Computers::create($request->all());

        return response()->json([
            'mensagem' => 'Computador cadastrado com sucesso',
            'computador' => $computer,
            'status' => 201
        ], 201);
    }

    public function show($id)
    {
        $computer = Computers::with('laboratorio')->find($id);

        if (!$computer) {
            return response()->json([
                'mensagem' => 'Computador não encontrado',
                'status' => 404
            ], 404);
        }

        return response()->json([
            'computador' => $computer,
            'status' => 200
        ]);
    }

    public function update(Request $request, $id)
    {
        $computer = Computers::find($id);

        if (!$computer) {
            return response()->json([
                'mensagem' => 'Computador não encontrado',
                'status' => 404
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'nome' => 'required|string|max:255',
            'patrimonio' => "required|string|unique:computers,patrimonio,$id",
            'retirado' => 'boolean',
            'laboratory_id' => 'required|exists:laboratories,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'mensagem' => 'Erro na validação dos dados',
                'erros' => $validator->errors(),
                'status' => 400
            ], 400);
        }

        $computer->update($request->all());

        return response()->json([
            'mensagem' => 'Computador atualizado com sucesso',
            'computador' => $computer,
            'status' => 200
        ]);
    }

    public function destroy($id)
    {
        $computer = Computers::find($id);

        if (!$computer) {
            return response()->json([
                'mensagem' => 'Computador não encontrado',
                'status' => 404
            ], 404);
        }

        $computer->delete();

        return response()->json([
            'mensagem' => 'Computador removido com sucesso',
            'status' => 200
        ]);
    }

    public function toggleRetirado($id)
    {
        $computer = Computers::find($id);

        if (!$computer) {
            return response()->json([
                'mensagem' => 'Computador não encontrado',
                'status' => 404
            ], 404);
        }

        $computer->retirado = !$computer->retirado;
        $computer->save();

        return response()->json([
            'mensagem' => 'Status de retirada atualizado com sucesso',
            'computador' => $computer,
            'status' => 200
        ]);
    }
}