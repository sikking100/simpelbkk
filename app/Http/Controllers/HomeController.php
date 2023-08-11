<?php

namespace App\Http\Controllers;

use App\Models\Announcement;
use App\Models\Banner;
use App\Models\Documentation;
use App\Models\Group;
use App\Models\Income;
use App\Models\Pagu;
use App\Models\Realization;
use App\Models\Video;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function home()
    {

        $documentations = Documentation::all();
        $banner = Banner::all()->first();
        $announcements = Announcement::all()->sortByDesc('date')->values()->all();
        $videos = Video::all();
        return Inertia::render('Guest/Home', [
            'documentations' => $documentations,
            'banner' => $banner,
            'announcements' => $announcements,
            'videos' => $videos,
        ]);
    }

    public function data($year)
    {
        $pagu = Pagu::whereYear('date', $year)->get()->sum('value');
        $totalDana = Income::whereYear('date', $year)->get()->sum('received');
        $realisasi = Realization::whereYear('date', $year)->get()->sum('amount');
        $totalGroup = Group::whereYear('created_at', $year)->get()->count();
        $pendapatan = Income::whereYear('date', $year)->get()->sum('income');
        return response()->json([
            'pagu' => $pagu,
            'dana' => $totalDana,
            'realisasi' => $realisasi,
            'group' => $totalGroup,
            'pendapatan' => $pendapatan,
        ]);
    }

    public function bottom($request)
    {
        if (is_numeric($request)) {
            $groups = Group::whereYear('date', $request)->get();
        } else {
            $groups = Group::all()->filter(function ($value, $key) use ($request) {
                return str()->contains(str($value->name)->upper(), str()->upper($request)) || str()->contains(str($value->user->village->name)->upper(), str()->upper($request));
            });
        }
        $homeUsers = collect();
        foreach ($groups as $key => $value) {
            $user['kecamatan'] = $value->user->district->name ?? '';
            $user['desa'] = $value->user->village->name ?? '';
            $user['kelompok'] = $value->name;
            $user['kategori'] = $value->category->name;
            $user['ketua'] = $value->member->firstWhere('type', 'ketua')->name ?? '';
            $user['phone'] = $value->phone;
            $user['bantuan'] = $value->income->sum('received');
            $user['pendapatan'] = $value->income->sum('income');
            $user['opd'] = $value->opd->name;
            $user['status'] = $value->status;
            $homeUsers->add($user);
        }
        return response()->json($homeUsers);
    }
}
