<?php

namespace App\Http\Controllers;

use App\Models\Pagu;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PaguController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $pagu = Pagu::all()->first();
        return Inertia::render('Admin/Pagu/Index', compact('pagu'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $pagu = Pagu::make($request->all());
        $pagu->save();
        session()->flash('message', trans('message.create'));
        return redirect()->route('pagu.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Pagu  $pagu
     * @return \Illuminate\Http\Response
     */
    public function show(Pagu $pagu)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Pagu  $pagu
     * @return \Illuminate\Http\Response
     */
    public function edit(Pagu $pagu)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Pagu  $pagu
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Pagu $pagu)
    {
        $pagu->update();
        session()->flash('message', trans('message.update'));
        return redirect()->route('pagu.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Pagu  $pagu
     * @return \Illuminate\Http\Response
     */
    public function destroy(Pagu $pagu)
    {
        //
    }
}
