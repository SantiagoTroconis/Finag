document.addEventListener('DOMContentLoaded', function () {
    initQuiz();
    initVideos();
    initTeamModal();
    initAR(); 

    function initQuiz() {
        const quizContainer = document.getElementById('quiz-container');
        if (!quizContainer) return;

        const allQuestions = [
            { question: "¿País con más Copas del Mundo?", options: ["Alemania", "Argentina", "Brasil", "Italia"], answer: "Brasil" },
            { question: "El Mundial 2026 tendrá __ equipos.", options: ["32", "48", "64", "40"], answer: "48" },
            { question: "¿Cuál país NO será anfitrión en 2026?", options: ["Canadá", "México", "Costa Rica", "EE.UU."], answer: "Costa Rica" },
            { question: "Máximo goleador en Mundiales:", options: ["Messi", "Ronaldo", "Klose", "Pelé"], answer: "Klose" },
            { question: "¿Quién ganó el primer Mundial (1930)?", options: ["Uruguay", "Argentina", "Brasil", "Italia"], answer: "Uruguay" },
            { question: "¿En qué año ganó España su mundial?", options: ["2006", "2010", "2014", "2018"], answer: "2010" },
            { question: "¿Qué jugador tiene más partidos en mundiales?", options: ["Paolo Maldini", "Lionel Messi", "Lothar Matthäus", "Cristiano Ronaldo"], answer: "Lionel Messi" },
            { question: "¿Qué país ganó el Mundial 2022?", options: ["Francia", "Argentina", "Croacia", "Brasil"], answer: "Argentina" },
            { question: "¿En qué continente se jugó el Mundial 2010?", options: ["Europa", "América", "África", "Asia"], answer: "África" },
            { question: "¿Qué país fue subcampeón en 2014?", options: ["Argentina", "Alemania", "Brasil", "Países Bajos"], answer: "Argentina" },
            { question: "¿Cuál de estos países nunca ha ganado un Mundial?", options: ["Inglaterra", "Francia", "Países Bajos", "Uruguay"], answer: "Países Bajos" },
            { question: "¿Dónde se celebró el Mundial 2002?", options: ["Japón y Corea del Sur", "China", "Alemania", "Australia"], answer: "Japón y Corea del Sur" },
            { question: "¿Quién fue el mejor jugador del Mundial 2014?", options: ["Messi", "James Rodríguez", "Neymar", "Müller"], answer: "Messi" },
            { question: "¿Qué selección ganó el Mundial 2018?", options: ["Croacia", "Francia", "Alemania", "Bélgica"], answer: "Francia" },
            { question: "¿Qué país organizó el Mundial 1998?", options: ["Italia", "Francia", "Alemania", "España"], answer: "Francia" },
            { question: "¿Cuántos mundiales ha ganado Italia?", options: ["2", "3", "4", "5"], answer: "4" },
            { question: "¿Quién marcó el 'Gol del Siglo' en México 1986?", options: ["Maradona", "Pelé", "Messi", "Ronaldo"], answer: "Maradona" },
            { question: "¿Qué selección fue anfitriona del Mundial 2014?", options: ["Brasil", "Alemania", "Sudáfrica", "Rusia"], answer: "Brasil" },
            { question: "¿Quién fue el campeón del Mundial 2006?", options: ["Italia", "Francia", "Alemania", "Brasil"], answer: "Italia" },
            { question: "¿Qué país será sede principal del Mundial 2026?", options: ["Canadá", "EE.UU.", "México", "Los tres por igual"], answer: "EE.UU." },
            { question: "¿Qué selección rompió el récord de más goles en un solo Mundial (1954)?", options: ["Hungría", "Brasil", "Alemania", "Uruguay"], answer: "Hungría" },
            { question: "¿Qué país fue eliminado 7-1 en semifinales del 2014?", options: ["Brasil", "Alemania", "Argentina", "España"], answer: "Brasil" },
            { question: "¿Qué jugador fue capitán de Francia en el Mundial 2018?", options: ["Mbappé", "Griezmann", "Lloris", "Pogba"], answer: "Lloris" },
            { question: "¿Dónde se jugará la final del Mundial 2026?", options: ["Toronto", "Ciudad de México", "Nueva York / Nueva Jersey", "Los Ángeles"], answer: "Nueva York / Nueva Jersey" },
            { question: "¿Qué selección ha jugado más finales de Mundial?", options: ["Brasil", "Alemania", "Argentina", "Italia"], answer: "Alemania" }
        ];

        function loadQuiz() {
            const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
            const selectedQuestions = shuffled.slice(0, 5);
            let quizHTML = '<div class="row g-4">';
            selectedQuestions.forEach((q) => {
                quizHTML += `
                    <div class="col-custom">
                        <div class="card quiz-card h-100">
                            <div class="card-body">
                                <h5 class="card-title small mb-3" style="color: #fff; display: block; white-space: normal; word-break: break-word; overflow-wrap: break-word; max-width: 100%;">${q.question}</h5>
                                <div class="d-grid gap-2 quiz-options-container">
                                    ${q.options.map(opt => `<button class="btn quiz-option p-2" data-answer="${q.answer}">${opt}</button>`).join('')}
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            });
            quizHTML += '</div>';
            quizContainer.innerHTML = quizHTML;
            quizContainer.querySelectorAll('.quiz-option').forEach(option => {
                option.addEventListener('click', checkAnswer);
            });
        }

        function checkAnswer(e) {
            const selectedOption = e.target;
            const correctAnswer = selectedOption.getAttribute('data-answer');
            const optionsContainer = selectedOption.parentElement;

            optionsContainer.querySelectorAll('.quiz-option').forEach(btn => {
                btn.disabled = true;
                if (btn.textContent === correctAnswer) {
                    btn.classList.add('correct');
                }
            });

            if (selectedOption.textContent !== correctAnswer) {
                selectedOption.classList.add('incorrect');
            }
            setTimeout(loadQuiz, 2000);
        }

        loadQuiz();
    }

    function initVideos() {
        const highlightsContainer = document.getElementById('highlightsContainer');
        if (!highlightsContainer) return;

        function loadVideos() {
            fetch('/videos.json')
                .then(res => res.json())
                .then(videos => {
                    const highlightsRow = highlightsContainer.querySelector('.horizontal-scroll-wrapper .row');
                    let videosHTML = '';
                    videos.forEach(video => {
                        let videoUrl = video.videos[1].link;
                        let embedUrl = '';
                        if (videoUrl.includes('youtube.com/watch?v=')) {
                            const videoId = videoUrl.split('v=')[1].split('&')[0];
                            embedUrl = `https://www.youtube.com/embed/${videoId}`;
                        } else if (videoUrl.includes('youtu.be/')) {
                            const videoId = videoUrl.split('youtu.be/')[1].split('?')[0];
                            embedUrl = `https://www.youtube.com/embed/${videoId}`;
                        } else if (videoUrl.includes('playlist?list=')) {
                            const playlistId = videoUrl.split('list=')[1].split('&')[0];
                            embedUrl = `https://www.youtube.com/embed/videoseries?list=${playlistId}`;
                        } else {
                            embedUrl = videoUrl;
                        }
                        videosHTML += `
                            <div class="col-custom">
                                <div class="card h-100">
                                    <div class="ratio ratio-16x9 video-container normal" style="height: 200px;" data-video-id="${video.videos[1].titulo.replace(/\s+/g, '-').toLowerCase()}">
                                        <iframe src="${embedUrl}" title="${video.videos[1].titulo}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="border-radius: 0.375rem 0.375rem 0 0;"></iframe>
                                    </div>
                                    <div class="card-body">
                                        <h5 class="card-title" style="color: #fff; display: block; white-space: normal; word-break: break-word; overflow-wrap: break-word; max-width: 100%;">${video.videos[1].titulo}</h5>
                                        <p class="card-text" style="color: white;">${video.pais}</p>
                                    </div>
                                    <div class="filter-buttons text-center">
                                        <button class="filter-btn active" data-filter="normal" data-video-id="${video.videos[1].titulo.replace(/\s+/g, '-').toLowerCase()}"><i class="bi bi-circle"></i> Normal</button>
                                        <button class="filter-btn" data-filter="grayscale" data-video-id="${video.videos[1].titulo.replace(/\s+/g, '-').toLowerCase()}"><i class="bi bi-moon"></i> B&N</button>
                                        <button class="filter-btn" data-filter="sepia" data-video-id="${video.videos[1].titulo.replace(/\s+/g, '-').toLowerCase()}"><i class="bi bi-sun"></i> Sepia</button>
                                        <button class="filter-btn" data-filter="invert" data-video-id="${video.videos[1].titulo.replace(/\s+/g, '-').toLowerCase()}"><i class="bi bi-palette"></i> Invert</button>
                                    </div>
                                </div>
                            </div>
                        `;
                    });
                    highlightsRow.innerHTML = videosHTML;
                    addFilterEventListeners();
                });
        }

        function addFilterEventListeners() {
            document.querySelectorAll('.filter-btn').forEach(button => {
                button.addEventListener('click', function () {
                    const filter = this.getAttribute('data-filter');
                    const videoId = this.getAttribute('data-video-id');
                    const videoContainer = document.querySelector(`[data-video-id="${videoId}"]`);
                    const buttonsContainer = this.parentElement;
                    buttonsContainer.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
                    this.classList.add('active');
                    videoContainer.classList.remove('normal', 'grayscale', 'sepia', 'invert');
                    videoContainer.classList.add(filter);
                    this.style.transform = 'scale(0.95)';
                    setTimeout(() => { this.style.transform = ''; }, 150);
                });
            });
        }
        
        loadVideos();
    }   

    function initTeamModal() {
        const teamModal = document.getElementById('teamModal');
        if (!teamModal) return;

        teamModal.addEventListener('show.bs.modal', function (event) {
            const button = event.relatedTarget;
            const teamName = button.getAttribute('data-team-name');
            const confederation = button.getAttribute('data-team-confederation');
            const titles = button.getAttribute('data-team-titles');
            const appearances = button.getAttribute('data-team-appearances');
            const scorer = button.getAttribute('data-team-scorer');
            const flagSrc = button.getAttribute('data-team-flag'); // 💡 Se obtiene la bandera

            teamModal.querySelector('.modal-title').textContent = teamName;
            teamModal.querySelector('#modal-flag').src = flagSrc; // 💡 Se asigna la bandera
            teamModal.querySelector('#modal-confederation').textContent = confederation;
            teamModal.querySelector('#modal-titles').textContent = titles;
            teamModal.querySelector('#modal-appearances').textContent = appearances;
            teamModal.querySelector('#modal-scorer').textContent = scorer;
        });
    }


    function initAR() {
        const activateCameraBtn = document.getElementById('activateCamera');
        const closeCameraBtn = document.getElementById('closeCamera');
        const cameraContainer = document.getElementById('cameraContainer');
        const video = document.getElementById('camera');
        const resultEl = document.getElementById('result');
        const arToggleButton = document.getElementById('arToggleButton');
        const arCanvas = document.getElementById('arCanvas');

        if (!activateCameraBtn) return; 

        let model, currentStream, isProcessing = false;
        let predictionHistory = [];
        let predictRAF, animateRAF;

        let scene, camera, renderer, loader;
        let currentModelInScene = null;
        let currentDetectedCountry = null;

        const countryData = {
            "Canada": { modelPath: './models/Canada.glb' },
            "Mexico": { modelPath: './models/Mexico.glb' },
            "Usa": { modelPath: './models/Burger.glb' },
            "Argentina": { modelPath: './models/Messi.glb' },
            "Brasil": { modelPath: './models/Cristo.glb' },
            "Colombia": { modelPath: './models/Pablo.glb' },
            "Paraguay": { modelPath: './models/Paraguay.glb' },
            "Ecuador": { modelPath: './models/Ecuator.glb' },
            "Uruguay": { modelPath: './models/Uruguay.glb' },
            "Australia": { modelPath: './models/Australia.glb' },
            "Portugal": { modelPath: './models/Portugal.glb' },
            "Japon": { modelPath: './models/Sushi.glb' },
            "Jordania": { modelPath: './models/Jordania.glb' },
            "Corea del sur": { modelPath: './models/Ramen.glb' },
            "España": { modelPath: './models/Spain.glb' },
            "Arabia saudita": { modelPath: './models/Arabia_saudita.glb' },
            "Marruecos": { modelPath: './models/Marruecos.glb' },
            "Francia": { modelPath: './models/Croassaint.glb' }
        };
        const labels = ["Canada", "Mexico", "Usa", "Argentina", "Brasil", "Colombia", "Paraguay", "Ecuador", "Uruguay", "Australia", "Portugal", "Japon", "Jordania", "Corea del sur", "España", "Arabia saudita", "Marruecos", "Francia", "Sin bandera"];


        activateCameraBtn.addEventListener('click', async () => {
            cameraContainer.style.display = 'block';
            activateCameraBtn.style.display = 'none';

            await setupCamera();
            setupThreeJS();

            resultEl.textContent = "Cargando detector de banderas...";
            await loadTFModel();


            
            predictFrame();
            animateThreeJS();
        });


        closeCameraBtn.addEventListener('click', () => {
            cameraContainer.style.display = 'none';
            activateCameraBtn.style.display = 'inline-block';
            arToggleButton.style.display = 'none';

            if (predictRAF) {
                cancelAnimationFrame(predictRAF);
                predictRAF = null;
            }
            if (animateRAF) {
                cancelAnimationFrame(animateRAF);
                animateRAF = null;
            }

            if (currentStream) {
                currentStream.getTracks().forEach(track => track.stop());
                currentStream = null;
            }

            if (currentModelInScene) {
                disposeModel(currentModelInScene);
                currentModelInScene = null;
            }

            currentDetectedCountry = null;
            isProcessing = false;
            predictionHistory = [];
            resultEl.textContent = "Cargando...";
        });

        arToggleButton.addEventListener('click', toggleARModel);

        async function setupCamera() {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { exact: "environment" } } });
                video.srcObject = stream;
                currentStream = stream; // Guardar referencia
                return new Promise((resolve) => {
                    video.onloadedmetadata = () => resolve(video);
                });
            } catch (e) {
                alert("No se pudo acceder a la cámara. Revisa los permisos.");
                cameraContainer.style.display = 'none';
                activateCameraBtn.style.display = 'inline-block';
            }
        }


        async function loadTFModel() {
            try {
                model = await tf.loadLayersModel('./model/model.json');
                resultEl.textContent = "¡Listo! Apunta tu cámara a una bandera.";
            } catch(e) {
                resultEl.textContent = "Error al cargar el detector.";
                console.error(e);
            }
        }

        async function predictFrame() {
            if (!model || isProcessing || !currentStream) {
                predictRAF = requestAnimationFrame(predictFrame);
                return;
            }

            isProcessing = true;

            const tensor = tf.tidy(() => {
                return tf.browser.fromPixels(video)
                    .resizeNearestNeighbor([224, 224])
                    .toFloat()
                    .div(tf.scalar(255))
                    .expandDims();
            });

            const predictions = await model.predict(tensor).data();
            tensor.dispose();

            predictionHistory.push(Array.from(predictions));
            if (predictionHistory.length > 10) predictionHistory.shift();

            const avgPredictions = new Array(predictions.length).fill(0);
            predictionHistory.forEach(pred => {
                pred.forEach((value, index) => avgPredictions[index] += value);
            });
            avgPredictions.forEach((sum, index) => avgPredictions[index] /= predictionHistory.length);

            const maxConfidence = Math.max(...avgPredictions);
            const highestIndex = avgPredictions.indexOf(maxConfidence);
            const detectedLabel = labels[highestIndex];

            if (predictionHistory.length >= 5 && maxConfidence > 0.85) {
                resultEl.textContent = `Detectado: ${detectedLabel} (${(maxConfidence * 100).toFixed(1)}%)`;
                handleDetection(detectedLabel);
            } else {
                resultEl.textContent = "Buscando una bandera...";
                handleDetection("Sin Bandera");
            }

            isProcessing = false;
            predictRAF = requestAnimationFrame(predictFrame);
        }

        function handleDetection(detectedLabel) {
            
            if (detectedLabel === "Sin Bandera" || !countryData[detectedLabel]) {
                if (currentDetectedCountry !== null) { 
                    arToggleButton.style.display = 'none';
                    if (currentModelInScene) {
                        disposeModel(currentModelInScene);
                        currentModelInScene = null;
                    }
                    currentDetectedCountry = null;
                }
                return;
            }

            if (detectedLabel !== currentDetectedCountry) {
                currentDetectedCountry = detectedLabel;

                if (currentModelInScene) {
                    disposeModel(currentModelInScene);
                    currentModelInScene = null;
                }

                arToggleButton.style.display = 'block';
                arToggleButton.innerHTML = `<i class="bi bi-box me-2"></i> Ver Modelo de ${detectedLabel}`;
                arToggleButton.dataset.country = detectedLabel;
                arToggleButton.disabled = false;
            }
        }

        async function toggleARModel() {
            const country = arToggleButton.dataset.country;
            if (!country) return;

            if (currentModelInScene) {
                disposeModel(currentModelInScene);
                currentModelInScene = null;
                arToggleButton.innerHTML = `<i class="bi bi-box me-2"></i> Ver Modelo de ${country}`;
                arToggleButton.disabled = false;
            }
            else {
                if (!countryData[country]) {
                    console.error(`No hay datos para el país: ${country}`);
                    return;
                }

                arToggleButton.innerHTML = `<i class="bi bi-arrow-down-circle-fill me-2"></i> Cargando...`;
                arToggleButton.disabled = true;

                try {
                    const modelPath = countryData[country].modelPath;
                    console.log(`Cargando modelo: ${modelPath}`);
                    const gltf = await loader.loadAsync(modelPath);

                    const newModel = gltf.scene;
                    
                    applyModelScale(newModel, country);
                    if (country === 'Francia') {
                        newModel.position.set(0, -2.0, 0);
                    } else if (country === 'Brasil') {
                        newModel.position.set(0, -1.5, 0);
                    } else {
                        newModel.position.set(0, -0.5, 0);
                    }

                    scene.add(newModel);
                    currentModelInScene = newModel;

                    arToggleButton.innerHTML = `<i class="bi bi-eye-slash me-2"></i> Ocultar Modelo`;

                } catch (e) {
                    console.error(`No se pudo cargar el modelo para ${country}:`, e);
                    arToggleButton.innerHTML = `<i class="bi bi-exclamation-triangle-fill me-2"></i> Error`;
                    setTimeout(() => {
                        if (!currentModelInScene) {
                            arToggleButton.innerHTML = `<i class="bi bi-box me-2"></i> Ver Modelo de ${country}`;
                        }
                    }, 2000);
                } finally {
                    arToggleButton.disabled = false; 
                }
            }
        }

        function animateThreeJS() {
            if (currentModelInScene) {
                currentModelInScene.rotation.y += 0.01;
            }
            if (renderer && scene && camera) {
                renderer.render(scene, camera);
            }
            animateRAF = requestAnimationFrame(animateThreeJS);
        }

        function setupThreeJS() {
            scene = new THREE.Scene();

            camera = new THREE.PerspectiveCamera(75, video.clientWidth / video.clientHeight, 0.1, 1000);
            camera.position.z = 5;

            renderer = new THREE.WebGLRenderer({
                canvas: arCanvas,
                alpha: true,
                antialias: true
            });
            renderer.setSize(video.clientWidth, video.clientHeight);
            renderer.setPixelRatio(window.devicePixelRatio);

            renderer.outputEncoding = THREE.sRGBEncoding;
            renderer.toneMapping = THREE.ACESFilmicToneMapping;
            renderer.toneMappingExposure = 1.2;

            const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
            scene.add(ambientLight);

            const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
            directionalLight.position.set(5, 5, 5);
            directionalLight.castShadow = true;
            scene.add(directionalLight);

            const fillLight = new THREE.DirectionalLight(0xffffff, 0.8);
            fillLight.position.set(-5, 3, -5);
            scene.add(fillLight);

            const hemisphereLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 0.6);
            scene.add(hemisphereLight);

            const pointLight = new THREE.PointLight(0xffffff, 0.8, 100);
            pointLight.position.set(0, 2, 10);
            scene.add(pointLight);

            loader = new THREE.GLTFLoader();
        }

        function applyModelScale(model, country) {
            let scale = 2.0;
            if (['Arabia saudita', 'Australia', 'Canada', 'Jordania', 'Marruecos', 'Usa', 'Ecuador', 'España', 'Paraguay', 'Uruguay', 'Japon'].includes(country)) {
                scale = 5.0;
            } else if (['Brasil'].includes(country)) {
                scale = 0.08;
            }
            model.scale.set(scale, scale, scale);
        }

        function disposeModel(model) {
            if (!model) return;

            console.log("Limpiando modelo 3D de memoria...");
            model.traverse(object => {
                if (object.isMesh) {
                    if (object.geometry) {
                        object.geometry.dispose();
                    }
                    if (Array.isArray(object.material)) {
                        object.material.forEach(disposeMaterial);
                    } else if (object.material) {
                        disposeMaterial(object.material);
                    }
                }
            });
            scene.remove(model);
        }

        function disposeMaterial(material) {
            material.dispose();
            for (const key of Object.keys(material)) {
                const value = material[key];
                if (value && typeof value === 'object' && value.isTexture) {
                    value.dispose();
                }
            }
        }

    } 

});