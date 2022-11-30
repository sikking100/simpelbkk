<?php

namespace App\Http\Controllers;

use App\Models\TypeOfAction;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TypeOfActionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $types = TypeOfAction::all();
        return Inertia::render('Admin/Type/Index', compact('types'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('Admin/Type/Create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $type = TypeOfAction::make($request->all());
        $type->save();
        session()->flash('message', trans('message.create'));
        return redirect()->route('typeOfAction.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\TypeOfAction  $typeOfAction
     * @return \Illuminate\Http\Response
     */
    public function show(TypeOfAction $typeOfAction)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\TypeOfAction  $typeOfAction
     * @return \Illuminate\Http\Response
     */
    public function edit(TypeOfAction $typeOfAction)
    {
        return Inertia::render('Admin/Type/Edit', compact('typeOfAction'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\TypeOfAction  $typeOfAction
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, TypeOfAction $typeOfAction)
    {
        $typeOfAction->update($request->all());
        session()->flash('message', trans('message.update'));
        return redirect()->route('typeOfAction.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\TypeOfAction  $typeOfAction
     * @return \Illuminate\Http\Response
     */
    public function destroy(TypeOfAction $typeOfAction)
    {
        //
    }
}
