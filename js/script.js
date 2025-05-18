document.addEventListener("DOMContentLoaded", () => {
            let correctAnswers = 0;
            const correctCountElement = document.getElementById('correctCount');
            const rewardAlert = document.getElementById('rewardAlert');
            const closeRewardBtn = document.getElementById('closeReward');
            
            const cards = document.querySelectorAll(".card");
            
            cards.forEach(card => {
                card.addEventListener("click", () => {
          
                    if (card.classList.contains('flipped')) return;
                    
                    const isCorrect = card.dataset.correct === "true";
                    card.classList.add("flipped");
                    
                    if (isCorrect) {
                        correctAnswers++;
                        correctCountElement.textContent = correctAnswers;
                        lanzarConfetti();
                        
                        
                        if (correctAnswers === 3) {
                            setTimeout(() => {
                                rewardAlert.classList.add('show');
                                lanzarConfettiExtra();
                            }, 1000);
                        }
                    }
                });
            });
            
           
            closeRewardBtn.addEventListener('click', () => {
                rewardAlert.classList.remove('show');
            });
            
           
            function lanzarConfetti() {
                const container = document.querySelector(".confetti-container");
                
                for (let i = 0; i < 30; i++) {
                    const confetti = document.createElement("div");
                    confetti.classList.add("confetti");
                    confetti.style.left = Math.random() * 100 + "vw";
                    confetti.style.animationDelay = Math.random() * 2 + "s";
                    confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 70%)`;
                    container.appendChild(confetti);
                    
                    setTimeout(() => confetti.remove(), 5000);
                }
            }
            
            
            function lanzarConfettiExtra() {
                const container = document.querySelector(".confetti-container");
                
                for (let i = 0; i < 150; i++) {
                    const confetti = document.createElement("div");
                    confetti.classList.add("confetti");
                    confetti.style.left = Math.random() * 100 + "vw";
                    confetti.style.animationDelay = Math.random() * 2 + "s";
                    confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 70%)`;
                    confetti.style.width = '12px';
                    confetti.style.height = '12px';
                    container.appendChild(confetti);
                    
                    setTimeout(() => confetti.remove(), 5000);
                }
            }
            
           
            const acceptButton = document.getElementById("acceptMission");
            const villain = document.querySelector(".villain-small");
            const mission1 = document.getElementById("mission1");
            const main = document.querySelector("main");
            
            acceptButton.addEventListener("click", () => {
                villain.classList.add("hidden");
                main.classList.add("hidden");
                mission1.classList.remove("hidden");
            });
        });

        