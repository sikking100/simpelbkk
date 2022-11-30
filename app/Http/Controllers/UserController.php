<?php

namespace App\Http\Controllers;

use App\Models\District;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = User::all();
        foreach ($users as $key => $value) {
            if ($value->district_id == 0) {
                $district = '';
            } else {
                $district = $value->district->name;
            }
            if ($value->village_id == 0) {
                $village = '';
            } else {
                $village = $value->village->name;
            }
            $value['district_name'] = $district;
            $value['village_name'] = $village;
        }
        return Inertia::render('Admin/User/Index', compact('users'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $districts = District::all();
        return Inertia::render('Admin/User/Create', compact('districts'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user = User::make($request->all());
        $password = rand(100000, 999999);
        $user->password = Hash::make($password);
        $user->save();
        session()->flash('password', 'Password dari akun ' . $user->username . ' adalah ' . $password);
        session()->flash('message', trans('message.create'));
        return redirect()->route('user.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        $password = rand(100000, 999999);
        $user->password = Hash::make($password);
        $user->update();
        session()->flash('password', 'Password baru dari akun ' . $user->username . ' adalah ' . $password);
        return redirect()->route('user.index');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function edit(User $user)
    {
        $districts = District::all();
        return Inertia::render('Admin/User/Edit', [
            'user' => $user,
            'districts' => $districts
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        $user->update($request->all());
        session()->flash('message', trans('message.update'));
        return redirect()->route('user.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        //
    }
}
