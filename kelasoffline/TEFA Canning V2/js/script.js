/* Navigasi antar halaman (hash) */
const V=['home','organisasi','kemitraan','kunjungan','kontak'];
function go(){
  const h=(location.hash||'#home').slice(1),v=V.includes(h)?h:'home';
  V.forEach(x=>document.getElementById(x).hidden=x!==v);
  document.getElementById('hero').classList.toggle('in',!document.body.classList.contains('cv'));
  document.querySelectorAll('[data-v]').forEach(a=>a.classList.toggle('on',a.dataset.v===v));
  scrollTo(0,0);
}
if(!location.hash)document.body.classList.add('cv');
addEventListener('hashchange',()=>{document.body.classList.remove('cv');go()});
const masukBtn = document.getElementById('masuk');
if(masukBtn) {
  masukBtn.onclick=e=>{e.preventDefault();document.body.classList.remove('cv');location.hash='#home';go()};
}
go();

/* Kartu Produk & Mesin (slider) */
const D={
  Produk:[["Sarden SIP Saus Tomat","sarden-saus-tomat.jpg","Sarden dengan saus tomat yang diolah higienis dan dikemas dalam kaleng oleh Teaching Factory."],
          ["Sarden SIP Larutan Garam","sarden-sip.jpg","Sarden dalam larutan garam, diproduksi UPT Pengolahan dan Pengemasan Politeknik Negeri Jember."]],
  Mesin:[["Seamer","mesin-seamer.jpg","Menutup kaleng secara rapat agar produk tahan lama dan aman."],
        ["Retort (Autoclave)","proses-sterilisasi.jpg","Mensterilkan kaleng pada suhu dan tekanan tinggi sebelum dipasarkan."]]
};
Object.entries(D).forEach(([k,v])=>{
  let i=-1;const c=document.createElement('article');c.className='card pc';
  const cardsEl = document.getElementById('cards');
  if(cardsEl) cardsEl.append(c);
  const r=d=>{i=(i+d+v.length)%v.length;const[t,im,x]=v[i];
    c.innerHTML=`<div class="lb"><span>${k}</span><span>0${i+1}/0${v.length}</span></div><img src="img/${im}" alt="${t}"><div class="tr"><h3>${t}</h3><span><button data-d="-1">←</button><button data-d="1">→</button></span></div><p>${x}</p>`};
  c.onclick=e=>{if(e.target.dataset.d)r(+e.target.dataset.d)};r(1);
});

/* Kartu mitra + filter tahun */
const M=[["Nama mitra","Bidang kerja sama",2022],["Nama mitra","Bidang kerja sama",2023],["Nama mitra","Bidang kerja sama",2023],["Nama mitra","Bidang kerja sama",2024]];
const mb=document.getElementById('mitra');
function showM(y){
  if(!mb) return;
  mb.innerHTML=M.filter(m=>y==='Semua'||m[2]==y).map(m=>`<div class="card"><div class="ph" style="height:90px"></div><h3 style="font-size:17px">${m[0]}</h3><p style="font-size:13px;color:var(--g)">${m[1]}<br>Tahun ${m[2]}</p></div>`).join('')
}
document.querySelectorAll('.pl button').forEach(b=>b.onclick=()=>{document.querySelectorAll('.pl button').forEach(x=>x.classList.remove('on'));b.classList.add('on');showM(b.textContent)});
showM('Semua');

/* Kirim formulir (simulasi) */
function ok(f){alert('Terima kasih! Data Anda sudah kami terima.');f.reset();return false}
