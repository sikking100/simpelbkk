<?php

namespace App\Http\Controllers;

use App\Models\Group;
use App\Models\Realization;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RealizationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $groups = Group::where('user_id', auth()->user()->id)->get();
        return Inertia::render('Admin/Realization/Index', compact('groups'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $groups = Group::where('user_id', auth()->user()->id)->get();
        return Inertia::render('Admin/Realization/Create', compact('groups'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $realization = Realization::make($request->all());
        $realization['user_id'] = auth()->user()->id;
        $realization->save();
        session()->flash('message', trans('message.create'));
        return redirect()->route('realization.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Realization  $realization
     * @return \Illuminate\Http\Response
     */
    public function show(Realization $realization)
    {
        $realization['group_name'] = $realization->group->name;
        return Inertia::render('Admin/Realization/Create', compact('realization'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Realization  $realization
     * @return \Illuminate\Http\Response
     */
    public function edit(Realization $realization)
    {
        $groups = Group::where('user_id', auth()->user()->id)->get();
        return Inertia::render('Admin/Realization/Edit', [
            'realization' => $realization,
            'groups' => $groups
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Realization  $realization
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Realization $realization)
    {
        $realization['user_id'] = auth()->user()->id;
        $realization->update($request->all());
        session()->flash('message', trans('message.update'));
        return redirect()->route('realization.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Realization  $realization
     * @return \Illuminate\Http\Response
     */
    public function destroy(Realization $realization)
    {
        $realization->delete();
        session()->flash('message', trans('message.delete'));
        return redirect()->route('realization.index');
    }
}
