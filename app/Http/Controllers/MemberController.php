<?php

namespace App\Http\Controllers;

use App\Models\Group;
use App\Models\Income;
use App\Models\Member;
use App\Support\MyUploadFile;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MemberController extends Controller
{
    private $upload;

    public function __construct()
    {
        $this->upload = new MyUploadFile();
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Group $group)
    {
        $members = $group->member;
        return Inertia::render('Admin/Member/Index', [
            'group' => $group,
            'members' => $members
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Group $group)
    {
        return Inertia::render('Admin/Member/Create', compact('group'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $member = Member::make($request->all());
        if ($request->image != null) {
            $this->upload->uploadImage($request, 'members', $member);
        }
        $member->save();
        session()->flash('message', trans('message.create'));
        return redirect()->route('member.index', $request->group_id);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Member  $member
     * @return \Illuminate\Http\Response
     */
    public function show(Member $member)
    {
        $member['group_name'] = $member->group->name;
        return Inertia::render('Admin/Member/Show', compact('member'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Member  $member
     * @return \Illuminate\Http\Response
     */
    public function edit(Member $member)
    {
        return Inertia::render('Admin/Member/Edit', compact('member'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Member  $member
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Member $member)
    {
        if ($request->image != null) {
            $this->upload->deleteImage('members', $member);
            $this->upload->uploadImage($request, 'members', $member);
        }
        $member->update($request->all());
        session()->flash('message', trans('message.update'));
        return redirect()->route('member.index', $member->group_id);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Member  $member
     * @return \Illuminate\Http\Response
     */
    public function destroy(Member $member)
    {
        $this->upload->deleteImage('members', $member);
        $member->delete();
        session()->flash('message', trans('message.delete'));
        return redirect()->route('member.index', $member->group_id);
    }

    public function list()
    {

        return Inertia::render('Admin/Member/KabupatenList');
    }

    public function data($year)
    {
        $groups = Member::whereYear('created_at', $year)->get();
        $memberRecap = collect();
        foreach ($groups as $key => $value) {
            $user['kecamatan'] = $value->group->user->district->name;
            $user['desa'] = $value->group->user->village->name;
            $user['kelompok'] = $value->group->name;
            $user['name'] = $value->name;
            $user['type'] = $value->type;
            $user['nik'] = $value->nik;
            $user['pendidikan'] = $value->pendidikan;
            $memberRecap->add($user);
        }
        return response()->json($memberRecap);
    }
}
