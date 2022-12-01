<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Group;
use App\Models\TypeOfAction;
use App\Support\MyUploadFile;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GroupController extends Controller
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
        $user = auth()->user();
        $groups = Group::where('user_id', $user->id)->get();
        return Inertia::render('Admin/Group/Index', compact('groups'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $categories = Category::all();
        $types = TypeOfAction::all();
        return Inertia::render('Admin/Group/Create', [
            'categories' => $categories,
            'types' => $types
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $group = Group::make($request->all());
        if ($request->image != null) {
            $this->upload->uploadImage($request, 'groups', $group);
        }

        if ($request->proposal != null) {
            $this->upload->uploadProposal($request, 'groups', $group);
        }
        $group->user_id = auth()->user()->id;
        $group->save();
        session()->flash('message', trans('message.create'));
        return redirect()->route('group.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Group  $group
     * @return \Illuminate\Http\Response
     */
    public function show(Group $group)
    {
        $category = $group->category->name;
        $type = $group->typeOfAction->name;
        $group['category_name'] = $category;
        $group['type_name'] = $type;
        return Inertia::render('Admin/Group/Show', compact('group'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Group  $group
     * @return \Illuminate\Http\Response
     */
    public function edit(Group $group)
    {
        $categories = Category::all();
        $types = TypeOfAction::all();
        return Inertia::render('Admin/Group/Edit', [
            'categories' => $categories,
            'types' => $types,
            'group' => $group
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Group  $group
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Group $group)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Group  $group
     * @return \Illuminate\Http\Response
     */
    public function destroy(Group $group)
    {
        //
    }

    public function realizations(Group $group)
    {
        return response()->json([
            'realizations' => $group->realization
        ]);
    }

    public function incomes(Group $group)
    {
        return response()->json([
            'incomes' => $group->income
        ]);
    }

    public function documentations(Group $group)
    {
        return response()->json([
            'documentations' => $group->documentation
        ]);
    }
}
