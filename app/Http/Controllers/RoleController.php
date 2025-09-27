<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleController extends Controller implements HasMiddleware
{

    public static function middleware(){
        return [
            new Middleware('permission:roles index', only: ['index']),
            new Middleware('permission:roles create', only: ['create', 'store']),
            new Middleware('permission:roles edit', only: ['edit', 'update']),
            new Middleware('permission:roles delete', only: ['destroy']),
        ];
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $roles = Role::select('id', 'name')
            ->with('permissions:id,name')
            ->when($request->search, fn($search) => $search
            ->where('name', 'like', '%' . $request->search . '%'))
            ->latest()
            ->paginate(5);

        return inertia('Roles/Index', ['roles' => $roles, 'filters' => $request->only(['search'])]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $data = Permission::orderBy('name')->pluck(['id', 'name']);
        $collections = collect($data);
        $permissions = $collections->groupBy(function($item, $key){
            $word = explode(' ', $item);
            return $word[0];
        });

        return inertia('Roles/Create', ['permissions' => $permissions]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|min:3|max:255|unique:roles',
            'selectedPermissions' => 'required|array|min:1',
        ]);

        $role = Role::Create(['name' => $request->name]);
        $role->givePermissionTo($request->selectedPermissions);

        return to_route('roles.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Role $role)
    {
        $data = Permission::orderBy('name')->pluck(['id', 'name']);
        $collections = collect($data);
        $permissions = $collections->groupBy(function($item, $key){
            $word = explode(' ', $item);
            return $word[0];
        });

        $role->load('permissions');

        return inertia('Roles/Edit', ['role' => $role, 'permissions' => $permissions]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'name' => 'required|min:3|max:255|unique:roles,name,' .$role->$id,
            'selectedPermissions' => 'required|array|min:1',
        ]);

        $role->update(['name' => $request->name]);
        $role->syncPermissions($request->selectedPermissions);

        return to_route('roles.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // Delete role
        $role->delete();

        return back();
    }
}
