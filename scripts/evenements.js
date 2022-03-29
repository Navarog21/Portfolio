
window.addEventListener('pointermove', onPointerMove)
function onPointerMove(event)
{
	pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
	pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;
}
