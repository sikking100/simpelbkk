<?php

namespace App\Http\Controllers;

use App\Http\Requests\AuthRequest;
use App\Models\Banner;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AuthController extends Controller
{

    public function create()
    {
        $banner = Banner::all()->first();
        $siteKey = getEnv('NOCAPTCHA_SITEKEY');
        return Inertia::render('Admin/Auth/Login', [
            'siteKey' => $siteKey,
            'banner' => $banner,
        ]);
    }

    public function store(AuthRequest $request)
    {
        // $credentials = $request->getCredentials();
        // if (!Auth::validate($credentials)) {
        //     return redirect()->to('login')->withErrors(trans('auth.failed'));
        // }

        // $user = Auth::getProvider()->retrieveByCredentials($credentials);

        // Auth::login($user);

        // return $this->authenticated($request, $user);

        $request->authenticate();

        $request->session()->regenerate();

        return redirect()->intended(RouteServiceProvider::HOME);
    }

    public function authenticated(Request $request, $user)
    {
        return redirect()->intended(RouteServiceProvider::HOME);
    }

    public function logout(Request $request)
    {

        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        // Session::flush();
        // Auth::logout();
        return redirect('/');
    }
}
