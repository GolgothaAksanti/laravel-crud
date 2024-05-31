<div class="modal fade" id="product-modal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
    aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <form action="{{ route('products.store') }}" method="POST" id="product-form">
                @csrf
                <div class="modal-header">
                    <h5 class="modal-title" id="modal-title">Create Product</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="form-group py-2">
                        <label for="title">Name</label>
                        <input type="text" name="title" id="title" placeholder="Name" class="form-control" />
                    </div>

                    <div class="form-group py-2">
                        <label for="title">Price</label>
                        <input type="number" name="price" id="price" placeholder="Price" class="form-control" />
                    </div>

                    <div class="form-group py-2">
                        <label for="title">Description</label>
                        <textarea name="description" id="description" placeholder="Description" class="form-control"></textarea>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-primary">Save</button>
                </div>
            </form>
        </div>
    </div>
</div>
