<?php

namespace Database\Seeders;

use App\Models\User;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //Create User
        $user = User::create([
            'name' => 'admin',
            'email' => 'admin@admin.com',
            'phone' => '-',
            'password' => bcrypt('password'),
        ]);

        // Get All Permission
        $permissions = Permission::all();

        // Get Role Admin
        $role = Role::find(1);

        // Assign permission to role
        $role->syncPermissions($permissions);

        // Assign role to user
        $user->assignRole([$role]);
    }
}
