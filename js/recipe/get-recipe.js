document.addEventListener("DOMContentLoaded", function () {
    function fetchData() {
      const headers = new Headers({
        "Content-Type": "application/json",
      });
  
      fetch("https://server-pemograman.vercel.app/items", { headers: headers })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          if (Array.isArray(data)) {
            updateTable(data);
          } else if (data.data) {
            updateTable(data.data);
          } else {
            throw new Error("Invalid data format");
          }
        })
        .catch((error) => console.error("Error fetching data:", error));
    }
  
    // Fungsi untuk mengupdate tabel dengan data baru
    function updateTable(data) {
      const tableBody = document.querySelector("#add-row tbody");
      tableBody.innerHTML = ""; // Membersihkan isi tabel terlebih dahulu
  
      // Membuat baris baru di tabel untuk setiap item data
      data.forEach((item) => {
        const row = tableBody.insertRow();
        row.insertCell().textContent = item.name;
        row.insertCell().textContent = item.description;
        row.insertCell().textContent = item.price;
        row.insertCell().textContent = item.quantity;
        row.insertCell().textContent = item.category_id;
  
        const actionCell = row.insertCell();
        actionCell.innerHTML = `
          <button type="button" class="btn btn-link btn-primary btn-lg" data-bs-toggle="tooltip" title="Edit" onclick="editItem(${item.id_items})">
            <i class="fa fa-edit"></i>
          </button>
          <button type="button" class="btn btn-link btn-danger btn-lg" data-bs-toggle="tooltip" title="Delete" onclick="hapusItem(${item.id_items})">
            <i class="fa fa-times"></i>
          </button>
        `;
      });
    }
  
    // Memanggil fungsi fetch pada saat halaman dimuat
    fetchData();
  
    window.editItem = function (id) {
      console.log("Editing item with ID:", id);
      window.location.href = `edit-resep.html?recipe_id=${id}`;
    };
  
    // Definisi fungsi untuk menghapus item
    window.hapusItem = function (id) {
      Swal.fire({
        title: "Apakah Anda yakin?",
        text: "Anda tidak akan dapat mengembalikan ini!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, hapus saja!",
        cancelButtonText: "Batal",
      }).then((result) => {
        if (result.isConfirmed) {
          // Jika pengguna mengkonfirmasi penghapusan
          const url = `https://server-pemograman.vercel.app/delete/item/${id}`;
          fetch(url, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem("LOGIN")}`, // Assuming the token is stored in localStorage
            },
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error("Network response was not ok");
              }
              // Handle empty response
              return response.text().then((text) => text ? JSON.parse(text) : {});
            })
            .then((data) => {
              if (Object.keys(data).length === 0) {
                Swal.fire("Dihapus!", "Item Anda telah dihapus.", "success");
              } else {
                Swal.fire(
                  "Gagal!",
                  "Terjadi kesalahan saat menghapus item.",
                  "error"
                );
              }
              fetchData(); // Memuat ulang data untuk memperbarui tampilan
            })
            .catch((error) => {
              console.error("Error:", error);
              Swal.fire(
                "Gagal!",
                "Terjadi kesalahan saat menghapus item.",
                "error"
              );
            });
        }
      });
    };
  });
  