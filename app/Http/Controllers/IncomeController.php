<?php

namespace App\Http\Controllers;

use App\Models\Group;
use App\Models\Income;
use Illuminate\Http\Request;
use Inertia\Inertia;

class IncomeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $groups = Group::where('user_id', auth()->user()->id)->get();
        return Inertia::render('Admin/Income/Index', compact('groups'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $groups = Group::where('user_id', auth()->user()->id)->get();
        return Inertia::render('Admin/Income/Create', compact('groups'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $income = Income::make($request->all());
        $income['user_id'] = auth()->user()->id;
        $income->save();
        session()->flash('message', trans('message.create'));
        return redirect()->route('income.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Income  $income
     * @return \Illuminate\Http\Response
     */
    public function show(Income $income)
    {
        $income['group_name'] = $income->group->name;
        return Inertia::render('Admin/Income/Create', compact('income'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Income  $income
     * @return \Illuminate\Http\Response
     */
    public function edit(Income $income)
    {
        $groups = Group::where('user_id', auth()->user()->id)->get();
        return Inertia::render('Admin/Income/Edit', [
            'groups' => $groups,
            'income' => $income
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Income  $income
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Income $income)
    {
        $income['user_id'] = auth()->user()->id;
        $income->update($request->all());
        session()->flash('message', trans('message.update'));
        return redirect()->route('income.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Income  $income
     * @return \Illuminate\Http\Response
     */
    public function destroy(Income $income)
    {
        $income->delete();
        session()->flash('message', trans('message.delete'));
        return redirect()->route('income.index');
    }

    public function list()
    {
        return Inertia::render('Admin/Income/KabupatenList');
    }

    public function data($year)
    {
        $groups = Group::whereYear('date', $year)->get();
        $datas = collect();
        foreach ($groups as $key => $value) {
            $data['kecamatan'] = $value->user->district->name;
            $data['desa'] = $value->user->village->name;
            $data['kelompok'] = $value->name;
            $data['bantuan'] = $value->realization->sum('use');
            $data['jenis'] = $value->typeOfAction->name;
            $data['realisasi'] = $value->realization->sum('amount');
            // $p = 0;
            // foreach ($value->income->get() as $k => $v) {
            //     if ($v->date == '2023-07-31') {
            //         $p += $v->income;
            //     }
            // }
            $data['pendapatan'] = $value->income->sum('income');
            // $data['pendapatan'] = $p;
            $data['keterangan'] = $value->description;
            $data['status'] = $value->status;
            $data['id'] = $value->id;
            $datas->add($data);
        }
        return response()->json($datas);
    }
}
