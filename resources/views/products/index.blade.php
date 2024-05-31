@extends('layouts.app')
@section('content')
    @include('products.subview.create')

    <div class="container py-5">
        <h3 class="text-center fw-bold">AJAX | JQUERY | LARAVEL</h3>
        <div class="row border-top pt-2">
            <div class="col-xl-6 text-start">
                <a href="javascript:void(0)" id="status-btn" class="btn btn-success d-none">Update status</a>
                <a href="javascript:void(0)" id="bulk-delete-btn" class="btn btn-danger d-none">delete</a>
            </div>
            <div class="col-xl-6 text-end">
                <a href="javascript:void(0)" id="create-product-btn" class="btn btn-primary">Create Product</a>
            </div>
        </div>

        <div class="table-responsive pt-4">
            <table id="product-table" class="table table-striped">
                <thead>
                    <tr>
                        <th data-orderable="false" class="no-sort"><input type="checkbox" class="form-check-input"
                                id="select-all" /></th>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    @forelse ($products as $product)
                        <tr id="{{ 'product_' . $product->id }}">
                            <td> <input type="checkbox" class="form-check-input product-checkbox"
                                    value="{{ $product->id }}" />
                            </td>
                            <td>{{ $product->id }}</td>
                            <td>{{ $product->title }}</td>
                            <td>{{ $product->description }}</td>
                            <td>{{ $product->price }}</td>
                            <td>{{ $product->status ? 'Yes' : 'No' }}</td>
                            <td>
                                <a href="javascript:void(0)" class="btn btn-info btn-sm btn-view"
                                    data-id="{{ $product->id }}">View</a>
                                <a href="javascript:void(0)" class="btn btn-success btn-sm btn-edit"
                                    data-id="{{ $product->id }}">Edit</a>
                                <a href="javascript:void(0)" class="btn btn-danger btn-sm btn-delete"
                                    data-id="{{ $product->id }}">Delete</a>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="6">
                                <p class="text-danger">No products</p>
                            </td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>
@endsection
