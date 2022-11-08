export function getRandomColors() {
    const hexadecimais = '0123456789ABCDEF';
    var color = '#';
  
    for (var i = 0; i < 6; i++ ) 
        color += hexadecimais[Math.floor(Math.random() * 16)];
    
    return color;
}