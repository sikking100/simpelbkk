<?php

namespace App\Http\Controllers;

use App\Models\Group;
use App\Models\Income;
use App\Models\Realization;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function data($year)
    {

        if (auth()->user()->type == 'desa') {
            // $totalGroup = Group::where('user_id', auth()->user()->id)->whereYear('date', $year)->get();
            $totalPendapatan = Income::where('user_id', auth()->user()->id)->whereYear('date', $year)->get();
            $totalRealisasi = Realization::where('user_id', auth()->user()->id)->whereYear('date', $year)->get();
            $totalGroup = Realization::where('user_id', auth()->user()->id)->whereYear('date', $year)->get();
            return response()->json([
                'totalPendapatan' => $totalPendapatan->sum('income'),
                'totalGroup' => $totalGroup->unique('group_id')->count(),
                // 'totalGroup' => $totalGroup->count(),
                'totalBantuan' => $totalRealisasi->sum('use'),
                'totalRealisasi' => $totalRealisasi->sum('amount'),
            ]);
        } else {
            $groups = Group::whereYear('date', $year)->get();
            $totalRealisasi = 0;
            $totalPendapatan = 0;
            $totalBantuan = 0 ;
            foreach ($groups as $key => $value) {
                $totalRealisasi += $value->realization->sum('amount');
                $totalPendapatan += $value->income->sum('income');
                $totalBantuan += $value->realization->sum('use');
            }
            // $totalPendapatan = Income::whereYear('date', $year)->get();
            // $totalRealisasi = Realization::whereYear('date', $year)->get();
            // $totalGroup = Realization::whereYear('date', $year)->get();
            return response()->json([
                'totalPendapatan' => $totalPendapatan,
                'totalGroup' => $groups->count(),
                // 'totalGroup' => $totalGroup->count(),
                'totalBantuan' => $totalBantuan,
                'totalRealisasi' => $totalRealisasi,
            ]);

        }

    }
}
