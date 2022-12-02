<?php

namespace App\Http\Controllers;

use App\Models\Documentation;
use App\Models\Group;
use App\Support\MyUploadFile;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DocumentationController extends Controller
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
    public function index()
    {
        $groups = Group::where('user_id', auth()->user()->id)->get();
        return Inertia::render('Admin/Documentation/Index', compact('groups'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $groups = Group::where('user_id', auth()->user()->id)->get();
        return Inertia::render('Admin/Documentation/Create', compact('groups'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $documentation = Documentation::make($request->all());
        if ($request->image != null) {
            $this->upload->uploadImage($request, 'documentations', $documentation);
        }
        $documentation['user_id'] = auth()->user()->id;

        $documentation->save();
        session()->flash('message', trans('message.create'));
        return redirect()->route('documentation.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Documentation  $documentation
     * @return \Illuminate\Http\Response
     */
    public function show(Documentation $documentation)
    {
        $documentation['group_name'] = $documentation->group->name;
        return Inertia::render('Admin/Documentation/Show', compact('documentation'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Documentation  $documentation
     * @return \Illuminate\Http\Response
     */
    public function edit(Documentation $documentation)
    {
        $groups = Group::where('user_id', auth()->user()->id)->get();
        return Inertia::render('Admin/Documentation/Edit', [
            'groups' => $groups,
            'documentation' => $documentation
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Documentation  $documentation
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Documentation $documentation)
    {
        if ($request->image != null) {
            $this->upload->deleteImage('documentations', $documentation);
            $this->upload->uploadImage($request, 'documentations', $documentation);
        }
        $documentation['user_id'] = auth()->user()->id;
        $documentation->update($request->all());
        session()->flash('message', trans('message.update'));
        return redirect()->route('documentation.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Documentation  $documentation
     * @return \Illuminate\Http\Response
     */
    public function destroy(Documentation $documentation)
    {
        $this->upload->deleteImage('documentations', $documentation);
        $documentation->delete();
        session()->flash('message', trans('message.delete'));
        return redirect()->route('documentation.index');
    }

    public function list()
    {

        return Inertia::render('Admin/Documentation/KabupatenList');
    }

    public function data($year)
    {
        $groups = Group::whereYear('date', $year)->get();
        $datas = collect();
        foreach ($groups as $key => $value) {
            $data['kecamatan'] = $value->user->district->name;
            $data['desa'] = $value->user->village->name;
            $data['kelompok'] = $value->name;
            $data['proposal'] = $value->proposal;
            $data['keterangan'] = $value->description;
            $data['dokumentasi25'] = $value->documentation->firstWhere('progress', '25%')->image ?? '';
            $data['dokumentasi50'] = $value->documentation->firstWhere('progress', '50%')->image ?? '';
            $data['dokumentasi75'] = $value->documentation->firstWhere('progress', '75%')->image ?? '';
            $data['dokumentasi100'] = $value->documentation->firstWhere('progress', '100%')->image ?? '';
            $datas->add($data);
        }
        return response()->json($datas);
    }
}
