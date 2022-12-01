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
            $totalGroup = Group::where('user_id', auth()->user()->id)->whereYear('created_at', $year)->get();
            $totalPendapatan = Income::where('user_id', auth()->user()->id)->whereYear('date', $year)->get();
            $totalRealisasi = Realization::where('user_id', auth()->user()->id)->whereYear('date', $year)->get();
        } else {
            $totalGroup = Group::whereYear('created_at', $year)->get();
            $totalPendapatan = Income::whereYear('date', $year)->get();
            $totalRealisasi = Realization::whereYear('date', $year)->get();
        }
        return response()->json([
            'totalPendapatan' => $totalPendapatan->sum('income'),
            'totalGroup' => $totalGroup->count(),
            'totalBantuan' => $totalPendapatan->sum('received'),
            'totalRealisasi' => $totalRealisasi->sum('use'),
        ]);
    }
}
