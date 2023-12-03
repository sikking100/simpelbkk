<?php

namespace App\Http\Controllers;

use App\Models\Pagu;
use DateTime;
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
        $pagus = Pagu::all();
        return Inertia::render('Admin/Pagu/Index', compact('pagus'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('Admin/Pagu/Create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // check if date is already
        // dd($request->date);
        $d = new DateTime($request->date);
        $pagu = Pagu::whereYear('date', $d->format('Y'))->first();
        if ($pagu == null) {
            $pagu = new Pagu;
        }
        // $pagu = Pagu::find(1);
        // if (count($pagu) > 0) {
            $pagu->date = $d;
            $pagu->value = strval($request->value);
        // } else {
            // $pagu = Pagu::make($request->all());
        // }
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
        return Inertia::render('Admin/Pagu/Edit', compact('pagu'));
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
        $pagu->value = strval($request->value);
        $pagu->date = $request->date;
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
        $pagu->delete();
        session()->flash('message', trans('message.delete'));
        return redirect()->route('pagu.index');
    }
}
