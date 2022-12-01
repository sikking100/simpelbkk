<?php

namespace App\Http\Controllers;

use App\Models\Announcement;
use App\Models\Banner;
use App\Models\Documentation;
use App\Models\Group;
use App\Models\Income;
use App\Models\Realization;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function home()
    {
        $groups = Group::all();
        $homeUsers = collect();
        foreach ($groups as $key => $value) {
            $user['kecamatan'] = $value->user->district->name;
            $user['desa'] = $value->user->village->name;
            $user['group'] = $value->name;
            $user['kegiatan'] = $value->typeOfAction->name;
            $user['phone'] = $value->phone;
            $user['bantuan'] = Income::where('group_id', $value->id)->get()->sum('received');
            $homeUsers->add($user);
        }
        $documentations = Documentation::all();
        $banner = Banner::all()->first();
        $announcements = Announcement::all()->sortByDesc('date')->values()->all();
        return Inertia::render('Guest/Home', [
            'documentations' => $documentations,
            'homeUsers' => $homeUsers,
            'banner' => $banner,
            'announcements' => $announcements
        ]);
    }

    public function data($year)
    {
        $totalDana = Income::whereYear('date', $year)->get()->sum('received');
        $realisasi = Realization::whereYear('date', $year)->get()->sum('amount');
        $totalGroup = Group::whereYear('created_at', $year)->get()->count();
        $pendapatan = Income::whereYear('date', $year)->get()->sum('income');
        return response()->json([
            'dana' => $totalDana,
            'realisasi' => $realisasi,
            'group' => $totalGroup,
            'pendapatan' => $pendapatan,
        ]);
    }
}
