// Card navigation
$("#myTab a").on("click", function (e) {
  e.preventDefault();
  $(this).tab("show");
});

//Function Greedy
function greedycount(arr,c) {
  let n = arr.length;
  let j = false;
  let s = 0;
  let arrs = [];
  $("#greedy-value").html("");
  while (j != true){
    let i = 0;
    let min = 9999;

    //Looping mencari nilai terkecil
    for(i=0;i<n;i++){
      if (arr[i] <= min && arr[i] != 0){
        min = arr[i];
      }
    }

    //Looping agar nilai hanya terpanggil sekali
    for(i=0;i<n;i++){
      if (arr[i] == min){
        arr[i] = 0;
        i = n;
      }
    }

    //Menjumlahkan nilai yang terpilih (fungsi kelayakan)
    s += min;
    if (s <= c){
      arrs.push(min);
    }else{
      s -= min;
      j=true;
    }
  }
  $("#greedy-value").append("<div>Peti yang memenuhi syarat elemen = <span class='text-success'> ( " + arrs +" ) </span></div><br><div>Fungsi Kelayakan : " + s + " ≤ " + c );
  return arrs.length;
}

//Function Input array W
arr = [];
let c = 0;
let addW = function () {
  let wval = document.getElementById("wval").value;
  if (!isNaN(wval)) {
    if (wval < 1 || wval > 9999) {
      alert("Enter numbers more than equal to 1 and less than equal to 9999!");
    } else {
      arr.push(parseInt(wval));
      $("#arr").html("");
      $("#arr").append("W = { " + arr + " }<br>I = " + arr.length);
      $("#greedy-value").html("");
      $("#greedy-result").html("");
    }
  } else {
    alert("Enter a number!");
  }
  
  if (arr.length > 0) {
    $("#btn-1").html("<div class='btn-group'><button type='button' class='btn btn-sm btn-primary' id='next-1'>Next</button><button type='button' class='btn-sm btn btn-danger' id='delete-1'>Delete</button></div>");
  }

  $("#next-1").on("click", function () {
      $("#btn-2").html("<div class='input-group mx-auto'><input type='number' class='form-control' placeholder='Masukan Nilai C' min='1' max='9999' id='cval' /> <button type='button' class='btn-sm btn-primary' id='addcval'>Add</button></div>");

      //Function Input C
      let addC = function () {
        let cval = document.getElementById("cval").value;
        if (!isNaN(cval)) {
          if (cval < 1 || cval > 9999) {
            alert("Enter numbers more than equal to 1 and less than equal to 9999!");
          } else {
            c = cval;
            $("#valc").html("");
            $("#valc").append("C = " + c);
            $("#greedy-value").html("");
            $("#greedy-result").html("");
          }
        } else {
          alert("Enter a number!");
        }
        if (c > 0) {
          $("#btn-3").html("<p class='keterangan'>(Masukan ulang jika ingin mengganti nilai C)</p><div class='btn-group'><button type='button' class='btn btn-sm btn-success' id='calculate'>Calculate</button></div>");
        }

        //Memanggil Fungsi greedy
        $("#calculate").on("click", function () {
          $("#elemen-greedy").html("<h2 class='text-center'>Hasil</h2><h4>Elemen Greedy</h4><ul><li>Himpunan kandidat : <span class='fw-bold'>" + arr.length + "</span> peti kemas, Masing-masing peti kemas memiliki berat <span class='fw-bold'>{ " + arr + " }<span>.</li><li>Himpunan Solusi : Peti kemas yang terpilih dengan berat muatan maksimal <span class='fw-bold'>" + c + "<span>.</li><li>Fungsi Seleksi : Memilih peti kemas yang bermuatan kecil.</li><li>Fungsi Kelayakan : Memeriksa apakah peti kemas yang dipilih apabila muatannya ditambah dengan muatan peti sebelumnya tidak melebihi kapasitas muatan kapal.</li><li>Fungsi Obyektif : Kapal harus memuat peti kemas sebanyak mungkin.</li></ul>");
          $("#greedy-result").html("<div class='alert alert-success d-inline-block'>Solusi Optimal =" + greedycount(arr,c) + " peti</div><br><div class='btn-group'><button type='button' class='btn btn-sm btn-danger' id='reset'>Reset</button></div>");
          
          //Button Reset
          $("#reset").click(function () {
            arr = [];
            c = 0;
            $("#arr").html("");
            $("#btn-1").html("");
            $("#btn-2").html("");
            $("#valc").html("");
            $("#btn-3").html("");
            $("#elemen-greedy").html("");
            $("#greedy-value").html("");
            $("#greedy-result").html("");
          });
        });

        $("#cval").val("");

      }

      $("#addcval").click(addC);
      $("#cval").keypress(function (event) {
        let keycode = event.keyCode ? event.keyCode : event.which;
        if (keycode == "13") {
          addC();
        }
      });
  });

  $("#wval").val("");
  
  //Button Delete
  $("#delete-1").click(function () {
    $("#greedy-value").html("");
    $("#greedy-result").html("");
    if (arr.length === 0) {
      alert("Array null");
    } else {
      arr.pop();
      $("#arr").html("");
      $("#arr").append("{ " + arr + " }");
      if (arr.length === 0) {
        $("#arr").html("");
        $("#btn-1").html("");
        $("#greedy-value").html("");
        $("#greedy-result").html("");
      }
    }
  });
};

$("#addArr").click(addW);
$("#wval").keypress(function (event) {
  let keycode = event.keyCode ? event.keyCode : event.which;
  if (keycode == "13") {
    addW();
  }
});