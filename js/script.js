document.addEventListener('DOMContentLoaded', function() {
            const originalCards = document.getElementById('originalCards');
            const dropSlots = document.getElementById('dropSlots');
            const checkSequenceBtn = document.getElementById('checkSequence');
            const feedback = document.getElementById('feedback');
            const rewardAlert = document.getElementById('rewardAlert');
            const closeRewardBtn = document.getElementById('closeReward');
            const nextMissionBtn = document.getElementById('nextMissionBtn');
            const confettiContainer = document.getElementById('confettiContainer');
            
            let draggedCard = null;

            // Hacer las tarjetas arrastrables
            document.querySelectorAll('.event-card').forEach(card => {
                card.addEventListener('dragstart', function() {
                    draggedCard = this;
                    setTimeout(() => {
                        this.classList.add('dragging');
                    }, 0);
                });

                card.addEventListener('dragend', function() {
                    this.classList.remove('dragging');
                });
            });

            // Configurar las áreas de destino
            document.querySelectorAll('.sequence-slot').forEach(slot => {
                slot.addEventListener('dragover', function(e) {
                    e.preventDefault();
                    this.classList.add('highlight');
                });

                slot.addEventListener('dragleave', function() {
                    this.classList.remove('highlight');
                });

                slot.addEventListener('drop', function(e) {
                    e.preventDefault();
                    this.classList.remove('highlight');
                    
                    // Si ya hay una tarjeta en este espacio, devolverla al área original
                    if (this.firstChild) {
                        originalCards.appendChild(this.firstChild);
                    }
                    
                    // Colocar la tarjeta arrastrada en el espacio
                    if (draggedCard) {
                        this.appendChild(draggedCard);
                    }
                });
            });

            // Verificar la secuencia
            checkSequenceBtn.addEventListener('click', function() {
                let isCorrect = true;
                const slots = document.querySelectorAll('.sequence-slot');
                
                slots.forEach((slot, index) => {
                    const card = slot.querySelector('.event-card');
                    if (!card || card.dataset.order != (index + 1)) {
                        isCorrect = false;
                    }
                });
                
                if (isCorrect) {
                    feedback.textContent = '¡Secuencia correcta! Has completado el reto.';
                    feedback.className = 'sequence-feedback correct';
                    
                    // Mostrar recompensa
                    rewardAlert.classList.add('show');
                    launchConfetti();
                    
                    // Habilitar botón para siguiente misión
                    nextMissionBtn.disabled = false;
                } else {
                    feedback.textContent = 'La secuencia no es correcta. Inténtalo de nuevo.';
                    feedback.className = 'sequence-feedback incorrect';
                }
            });
            
            // Cerrar la alerta de recompensa
            closeRewardBtn.addEventListener('click', function() {
                rewardAlert.classList.remove('show');
            });
            
            // Función para lanzar confeti
            function launchConfetti() {
                for (let i = 0; i < 100; i++) {
                    const confetti = document.createElement('div');
                    confetti.className = 'confetti';
                    confetti.style.left = Math.random() * 100 + 'vw';
                    confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
                    confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
                    confettiContainer.appendChild(confetti);
                    
                    // Eliminar el confeti después de la animación
                    setTimeout(() => {
                        confetti.remove();
                    }, 5000);
                }
            }
        });