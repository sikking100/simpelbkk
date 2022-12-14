<?php

namespace App\Http\Controllers;

use App\Models\District;
use App\Models\Village;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DistrictController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $districts = District::all();
        return Inertia::render('Admin/District/Index', compact('districts'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('Admin/District/Create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $district = District::make($request->all());
        $district->save();
        session()->flash('message', 'Berhasil menambah data');
        return redirect()->route('district.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\District  $district
     * @return \Illuminate\Http\Response
     */
    public function show(District $district)
    {
        $villages = $district->villages;
        return Inertia::render('Admin/Village/Index', [
            "district" => $district,
            "villages" => $villages
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\District  $district
     * @return \Illuminate\Http\Response
     */
    public function edit(District $district)
    {
        return Inertia::render('Admin/District/Edit', compact('district'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\District  $district
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, District $district)
    {
        $district->update($request->all());
        session()->flash('message', 'Berhasil mengubah data');
        return redirect()->route('district.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\District  $district
     * @return \Illuminate\Http\Response
     */
    public function destroy(District $district)
    {
        //
    }

    public function villages(District $district)
    {
        return response()->json([
            'villages' => $district->villages
        ]);
    }

    public function villageCreate(District $district)
    {
        return Inertia::render('Admin/Village/Create', compact('district'));
    }

    public function villageStore(District $district, Request $request)
    {
        $village = new Village();
        $village->name = $request->name;
        $district->villages()->save($village);
        session()->flash('message', trans('message.create'));
        return redirect()->route('district.show', $district->id);
    }

    public function villageEdit(District $district, Village $village)
    {
        return Inertia::render('Admin/Village/Edit', [
            'district' => $district,
            'village' => $village,
        ]);
    }

    public function villageUpdate(District $district, Village $village, Request $request)
    {
        $village->update($request->all());
        session()->flash('message', trans('message.update'));
        return redirect()->route('district.show', $district->id);
    }
}
