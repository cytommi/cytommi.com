const paths = document.querySelectorAll('#left-box svg path')
paths.forEach((p, i) => {
    totalLength = p.getTotalLength();
    console.log(i, totalLength)
   
})
