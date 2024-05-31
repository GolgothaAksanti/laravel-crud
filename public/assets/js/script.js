$.ajaxSetup({
    headers: {
        "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
    },
});

$(document).ready(function () {
    $("#create-product-btn").click(function () {
        $("#product-modal #title").val("");
        $("#product-modal #price").val("");
        $("#product-modal #description").val("");
        $("#product-form input, #product-form textarea").removeAttr("disabled");
        $("#product-form button[type=submit]").removeClass("d-none");
        $("#product-form button[type=submit]").text("save");
        $("#product-form").attr("action", `${baseUrl}/products`);
        $("#modal-title").text("Create Product");
        $("#hidden-product-id").remove();
        $("#product-modal").modal("toggle");
    });

    $("#product-form").validate({
        rules: {
            title: {
                required: true,
                minlength: 3,
                maxlength: 50,
            },
            description: {
                required: true,
                minlength: 10,
                maxlength: 255,
            },
            price: {
                required: true,
                number: true,
            },
        },

        messages: {
            title: {
                required: "please enter a product name",
                minlength: "the product name is short",
                maxlength: "the product name is longer",
            },
            price: {
                required: "please enter a number",
                number: "please enter a valid number",
            },
            description: {
                required: "please enter the description",
                minlength: "the description is short",
                maxlength: "the description is longer",
            },
        },

        submitHandler: function (form) {
            $("#response").empty();
            const formData = $(form).serializeArray();

            const productId = $("#hidden-product-id").val();
            const methodType = productId ? "PUT" : "POST";
            const formAction = $(form).attr("action");

            $.ajax({
                url: formAction,
                type: methodType,
                data: formData,
                beforeSend: function () {
                    console.log("loading...");
                },
                success: function (response) {
                    $("#product-form")[0].reset();
                    $("#product-modal").modal("toggle");

                    if (response.status === "success") {
                        $("#response").html(
                            `<div class='alert alert-success alert-dismissible'>
                                ${response.message}
                                <button class='btn btn-close' type='button' data-bs-dismiss='alert'></button>
                            </div>`
                        );

                        // update
                        if (productId) {
                            $(`#product_${productId} td:nth-child(2)`).html(
                                response.product.title
                            );
                            $(`#product_${productId} td:nth-child(3)`).html(
                                response.product.description
                            );
                            $(`#product_${productId}  td:nth-child(4)`).html(
                                response.product.price
                            );
                        } else {
                            //create
                            $("#product-table").append(
                                `<tr id="product_${response.product.id}">
                                    <td>${response.product.id}</td>
                                    <td>${response.product.title}</td>
                                    <td>${response.product.description}</td>
                                    <td>${response.product.price}</td>
                                    <td>${
                                        response.product.status ? "Yes" : "No"
                                    }</td>
                                    <td>
                                        <a href="javascript:void(0)" class="btn btn-info btn-sm btn-view" data-id="${
                                            response.product.id
                                        }">View</a>
                                        <a href="javascript:void(0)" class="btn btn-success btn-sm btn-edit" data-id="${
                                            response.product.id
                                        }">Edit</a>
                                        <a href="javascript:void(0)" class="btn btn-danger btn-sm btn-delete" data-id="${
                                            response.product.id
                                        }">Delete</a>
                                    </td>
                                </tr>`
                            );
                        }
                    } else if (response.status === "failed") {
                        $("#response").html(
                            `<div class='alert alert-danger alert-dismissible'>
                                ${response.message}
                                <button class='btn btn-close' type='button' data-bs-dismis='alert'></button>
                            </div>`
                        );
                    }
                },
                error: function (error) {
                    $("#response").html(
                        `<div class='alert alert-danger alert-dismissible'>
                            ${response.message}
                            <button class='btn btn-close' type='button' data-bs-dismis='alert'></button>
                        </div>`
                    );
                },
            });
        },
    });

    $("#product-table").dataTable();

    // view
    $("#product-table").on("click", ".btn-view", function () {
        const productId = $(this).data("id");

        const mode = "view";

        productId && fetchProduct(productId, mode);
    });

    function fetchProduct(productId, mode = null) {
        if (productId) {
            $.ajax({
                url: `products/${productId}`,
                type: "GET",
                success: function (response) {
                    if (response.status === "success") {
                        const product = response.product;

                        $("#product-modal #title").val(product.title);
                        $("#product-modal #price").val(product.price);
                        $("#product-modal #description").val(
                            product.description
                        );
                        if (mode === "view") {
                            $(
                                "#product-form input, #product-form textarea"
                            ).attr("disabled", true);
                            $("#product-form button[type=submit]").addClass(
                                "d-none"
                            );
                            $("#product-form").removeAttr("action");
                            $("#modal-title").text("Product details");
                        } else if (mode === "edit") {
                            $(
                                "#product-form input, #product-form textarea"
                            ).removeAttr("disabled");
                            $("#product-form button[type=submit]").removeClass(
                                "d-none"
                            );
                            $("#product-form button[type=submit]").text(
                                "update"
                            );
                            $("#product-form").attr(
                                "action",
                                `${baseUrl}/products/${product.id}`
                            );
                            $("#modal-title").text("Update Product details");
                            $("#product-form").append(
                                `<input type="hidden" id="hidden-product-id" value="${product.id}"/>`
                            );
                        }

                        $("#product-modal").modal("toggle");
                    }
                },
                error: function (error) {
                    console.log(error);
                },
            });
        }
    }

    // update
    $("#product-table").on("click", ".btn-edit", function () {
        const productId = $(this).data("id");

        const mode = "edit";

        productId && fetchProduct(productId, mode);
    });

    // delete
    $("#product-table").on("click", ".btn-delete", function () {
        const productId = $(this).data("id");
        if (productId) {
            Swal.fire({
                title: "Are you sure?",
                text: "Once deleted, you won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Delete",
            }).then((result) => {
                if (result.isConfirmed) {
                    $.ajax({
                        url: `products/${productId}`,
                        type: "DELETE",
                        success: function (response) {
                            if (response.status === "success") {
                                Swal.fire({
                                    title: "Deleted!",
                                    text: "the product has been deleted.",
                                    icon: "success",
                                });

                                if (response.product) {
                                    $(
                                        `#product_${response.product.id}`
                                    ).remove();
                                }
                            } else {
                                Swal.fire({
                                    title: "Failed!",
                                    text: "Unable to delete product1",
                                    icon: "error",
                                });
                            }
                        },
                        error: function (error) {
                            Swal.fire({
                                title: "Failed!",
                                text: "Unable to delete product1",
                                icon: "error",
                            });
                        },
                    });
                }
            });
        }
    });
});
