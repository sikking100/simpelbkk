<?php

namespace App\Support;

use Illuminate\Support\Facades\File;

/**
 *
 */
class MyUploadFile
{

    public function uploadFile($request, $folder, $model)
    {
        $name = time() . '.' . $request->file->extension();
        $request->file->storeAs($folder, $name, 'public');
        $model->file = $name;
        return;
    }

    public function deleteFile($folder, $model)
    {
        if (File::exists(public_path('storage/' . $folder . '/' . $model->file))) {
            File::delete(public_path('storage/' . $folder . '/' . $model->file));
        }
        return;
    }

    public function uploadProposal($request, $folder, $model)
    {
        $name = time() . '.' . $request->proposal->extension();
        $request->proposal->storeAs($folder, $name, 'public');
        $model->proposal = $name;
        return;
    }

    public function deleteProposal($folder, $model)
    {
        if (File::exists(public_path('storage/' . $folder . '/' . $model->file))) {
            File::delete(public_path('storage/' . $folder . '/' . $model->file));
        }
        return;
    }

    public function uploadImage($request, $folder, $model)
    {
        $name = time() . '.' . $request->image->extension();
        $request->image->storeAs($folder, $name, 'public');
        $model->image = $name;
        return;
    }

    public function deleteImage($folder, $model)
    {
        if (File::exists(public_path('storage/' . $folder . '/' . $model->image))) {
            File::delete(public_path('storage/' . $folder . '/' . $model->image));
        }
        return;
    }
}
