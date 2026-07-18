/* ====================================================================
   TOJI PROTOCOL — Data layer
   Program metadata, the exercise library (each entry can carry an
   `image` pointing into images/exercises/), and the week 1 workout
   schedule that the app cycles through as a template.
   ==================================================================== */

const IMG = "images/exercises/";

const programData = {
    startDate: new Date('2026-07-17'),
    currentDay: 1,
    phase: 1,
    phases: {
        1: { name: "Foundation", weeks: "1-8", description: "Building movement patterns, work capacity, and base strength" },
        2: { name: "Muscle Growth", weeks: "9-16", description: "Hypertrophy focus with increased volume" },
        3: { name: "Strength", weeks: "17-24", description: "Lower reps, higher intensity, strength focus" },
        4: { name: "Athletic Development", weeks: "25-32", description: "Power, speed, and explosive movements" },
        5: { name: "Advanced Calisthenics", weeks: "33-40", description: "Skill work and advanced progressions" },
        6: { name: "Peak Performance", weeks: "41-52", description: "Integration and peak physique development" }
    }
};

// Exercise Database
const exercises = {
    // Push
    kneePushup: {
        name: "Knee Push-up",
        category: "push",
        difficulty: "beginner",
        muscles: ["Chest", "Shoulders", "Triceps"],
        description: "Modified push-up on knees",
        image: IMG + "knee-pushup.jpg",
        instructions: [
            "Start on hands and knees",
            "Hands slightly wider than shoulders",
            "Keep body straight from knees to head",
            "Lower chest to floor",
            "Push back up explosively"
        ],
        sets: 3, reps: "8-12", rest: "60s"
    },
    inclinePushup: {
        name: "Incline Push-up",
        category: "push",
        difficulty: "beginner",
        muscles: ["Chest", "Shoulders", "Triceps"],
        description: "Push-up with hands elevated",
        image: IMG + "incline-pushup.jpg",
        instructions: [
            "Place hands on elevated surface (bed, chair, bench)",
            "Body in straight line",
            "Lower chest to surface",
            "Push back up"
        ],
        sets: 3, reps: "10-15", rest: "60s"
    },
    standardPushup: {
        name: "Standard Push-up",
        category: "push",
        difficulty: "intermediate",
        muscles: ["Chest", "Shoulders", "Triceps", "Core"],
        description: "Classic push-up",
        image: IMG + "standard-pushup.jpg",
        instructions: [
            "Hands shoulder-width apart",
            "Body straight from head to heels",
            "Lower until chest nearly touches floor",
            "Elbows at 45° angle",
            "Push back up powerfully"
        ],
        sets: 3, reps: "8-15", rest: "90s"
    },
    diamondPushup: {
        name: "Diamond Push-up",
        category: "push",
        difficulty: "intermediate",
        muscles: ["Triceps", "Chest", "Shoulders"],
        description: "Hands form diamond shape",
        image: IMG + "diamond-pushup.jpg",
        instructions: [
            "Hands close together forming diamond",
            "Thumbs and index fingers touch",
            "Lower with control",
            "Focus on triceps"
        ],
        sets: 3, reps: "6-12", rest: "90s"
    },
    pikePushup: {
        name: "Pike Push-up",
        category: "push",
        difficulty: "intermediate",
        muscles: ["Shoulders", "Triceps", "Upper Chest"],
        description: "Shoulder-focused push-up variation",
        image: IMG + "pike-pushup.jpg",
        instructions: [
            "Start in downward dog position",
            "Hips high, body forms inverted V",
            "Lower head toward floor",
            "Push back up"
        ],
        sets: 3, reps: "6-10", rest: "90s"
    },

    // Pull (no equipment substitutes)
    backpackRow: {
        name: "Backpack Row",
        category: "pull",
        difficulty: "beginner",
        muscles: ["Back", "Biceps", "Rear Delts"],
        description: "Rowing with weighted backpack",
        image: IMG + "backpack-row.jpg",
        instructions: [
            "Fill backpack with books/water bottles",
            "Bend at hips, back flat",
            "Pull backpack to chest",
            "Squeeze shoulder blades"
        ],
        sets: 3, reps: "10-15", rest: "60s"
    },
    towelRow: {
        name: "Towel Row",
        category: "pull",
        difficulty: "intermediate",
        muscles: ["Back", "Biceps", "Grip"],
        description: "Door anchor towel row",
        image: IMG + "towel-row.jpg",
        instructions: [
            "Loop towel around door handle",
            "Close door securely",
            "Lean back, arms extended",
            "Pull chest to hands",
            "Control the return"
        ],
        sets: 3, reps: "8-12", rest: "90s"
    },
    floorPull: {
        name: "Floor Pull (Prone Y-T-W)",
        category: "pull",
        difficulty: "beginner",
        muscles: ["Upper Back", "Rear Delts", "Rotator Cuff"],
        description: "Back activation on floor",
        image: IMG + "floor-pull.jpg",
        instructions: [
            "Lie face down",
            "Arms overhead in Y position",
            "Lift arms off ground",
            "Squeeze shoulder blades",
            "Form T, then W positions"
        ],
        sets: 2, reps: "10 each", rest: "60s"
    },
    scapularPushup: {
        name: "Scapular Push-up",
        category: "pull",
        difficulty: "beginner",
        muscles: ["Serratus", "Upper Back"],
        description: "Shoulder blade movement",
        image: null,
        instructions: [
            "Top of push-up position",
            "Arms straight",
            "Retract shoulder blades (sink down)",
            "Protract shoulder blades (push up)",
            "No elbow bend"
        ],
        sets: 2, reps: "15", rest: "60s"
    },

    // Legs
    bodyweightSquat: {
        name: "Bodyweight Squat",
        category: "legs",
        difficulty: "beginner",
        muscles: ["Quads", "Glutes", "Hamstrings"],
        description: "Basic squat pattern",
        image: IMG + "bodyweight-squat.jpg",
        instructions: [
            "Feet shoulder-width apart",
            "Chest up, core tight",
            "Sit back and down",
            "Knees track over toes",
            "Depth: thighs parallel to floor"
        ],
        sets: 3, reps: "15-20", rest: "60s"
    },
    splitSquat: {
        name: "Split Squat",
        category: "legs",
        difficulty: "beginner",
        muscles: ["Quads", "Glutes", "Balance"],
        description: "Stationary lunge",
        image: IMG + "split-squat.jpg",
        instructions: [
            "One foot forward, one back",
            "Lower back knee toward floor",
            "Front knee at 90°",
            "Push through front heel"
        ],
        sets: 3, reps: "10 each", rest: "60s"
    },
    bulgarianSplitSquat: {
        name: "Bulgarian Split Squat",
        category: "legs",
        difficulty: "intermediate",
        muscles: ["Quads", "Glutes", "Hamstrings"],
        description: "Rear foot elevated split squat",
        image: IMG + "bulgarian-split-squat.jpg",
        instructions: [
            "Back foot on bed/chair/bench",
            "Lower until front thigh parallel",
            "Keep torso upright",
            "Drive through front heel"
        ],
        sets: 3, reps: "8-12 each", rest: "90s"
    },
    gluteBridge: {
        name: "Glute Bridge",
        category: "legs",
        difficulty: "beginner",
        muscles: ["Glutes", "Hamstrings", "Core"],
        description: "Hip extension exercise",
        image: IMG + "glute-bridge.jpg",
        instructions: [
            "Lie on back, knees bent",
            "Feet flat on floor",
            "Lift hips to ceiling",
            "Squeeze glutes at top",
            "Lower with control"
        ],
        sets: 3, reps: "15-20", rest: "60s"
    },
    calfRaise: {
        name: "Calf Raise",
        category: "legs",
        difficulty: "beginner",
        muscles: ["Calves"],
        description: "Ankle extension",
        image: IMG + "calf-raise.jpg",
        instructions: [
            "Stand on edge of step/book",
            "Lower heels down",
            "Rise up on toes",
            "Full range of motion"
        ],
        sets: 3, reps: "20-25", rest: "45s"
    },

    // Core
    plank: {
        name: "Plank",
        category: "core",
        difficulty: "beginner",
        muscles: ["Core", "Shoulders", "Glutes"],
        description: "Isometric core hold",
        image: IMG + "plank.jpg",
        instructions: [
            "Forearms on ground",
            "Body straight line",
            "Engage core and glutes",
            "Don't let hips sag",
            "Breathe steadily"
        ],
        sets: 3, reps: "30-60s", rest: "60s"
    },
    deadBug: {
        name: "Dead Bug",
        category: "core",
        difficulty: "beginner",
        muscles: ["Deep Core", "Hip Flexors"],
        description: "Core stability exercise",
        image: IMG + "dead-bug.jpg",
        instructions: [
            "Lie on back, arms up",
            "Knees bent 90°",
            "Lower opposite arm and leg",
            "Keep lower back pressed down",
            "Return and switch"
        ],
        sets: 3, reps: "10 each", rest: "60s"
    },
    legRaise: {
        name: "Leg Raise",
        category: "core",
        difficulty: "intermediate",
        muscles: ["Lower Abs", "Hip Flexors"],
        description: "Lying leg raise",
        image: IMG + "leg-raise.jpg",
        instructions: [
            "Lie on back, legs straight",
            "Hands under glutes for support",
            "Lift legs to 90°",
            "Lower slowly without touching floor",
            "Control the movement"
        ],
        sets: 3, reps: "10-15", rest: "60s"
    },
    bicycleCrunch: {
        name: "Bicycle Crunch",
        category: "core",
        difficulty: "beginner",
        muscles: ["Obliques", "Abs"],
        description: "Rotational core exercise",
        image: IMG + "bicycle-crunch.jpg",
        instructions: [
            "Lie on back, hands behind head",
            "Bring opposite elbow to knee",
            "Extend other leg",
            "Alternate sides",
            "Rotate through torso"
        ],
        sets: 3, reps: "20 total", rest: "60s"
    },
    mountainClimber: {
        name: "Mountain Climber",
        category: "core",
        difficulty: "intermediate",
        muscles: ["Core", "Hip Flexors", "Shoulders"],
        description: "Dynamic core exercise",
        image: IMG + "mountain-climber.jpg",
        instructions: [
            "Top of push-up position",
            "Drive knee to chest",
            "Quickly switch legs",
            "Keep hips level",
            "Maintain fast pace"
        ],
        sets: 3, reps: "30s", rest: "60s"
    },

    // Mobility
    catCow: {
        name: "Cat-Cow",
        category: "mobility",
        difficulty: "beginner",
        muscles: ["Spine", "Core"],
        description: "Spinal mobility",
        image: IMG + "cat-cow.jpg",
        instructions: [
            "On hands and knees",
            "Arch back, look up (cow)",
            "Round back, tuck chin (cat)",
            "Flow between positions",
            "Move with breath"
        ],
        sets: 1, reps: "10", rest: "0s"
    },
    worldGreatestStretch: {
        name: "World's Greatest Stretch",
        category: "mobility",
        difficulty: "beginner",
        muscles: ["Hips", "Thoracic", "Hamstrings"],
        description: "Full body mobility",
        image: IMG + "worlds-greatest-stretch.jpg",
        instructions: [
            "Step into lunge",
            "Drop back knee",
            "Place opposite hand on floor",
            "Rotate chest up",
            "Straighten front leg"
        ],
        sets: 1, reps: "5 each", rest: "0s"
    },
    childPose: {
        name: "Child's Pose",
        category: "mobility",
        difficulty: "beginner",
        muscles: ["Back", "Hips", "Shoulders"],
        description: "Restorative stretch",
        image: IMG + "childs-pose.jpg",
        instructions: [
            "Knees wide, big toes touch",
            "Sit back on heels",
            "Fold forward",
            "Arms extended or by sides",
            "Breathe deeply"
        ],
        sets: 1, reps: "60s", rest: "0s"
    }
};

// Week 1-2 detailed workouts (template — cycles for the full 365-day program)
const week1Workouts = [
    {
        day: 1,
        date: "July 17, 2026",
        name: "Full Body Foundation A",
        duration: "45 min",
        intensity: "Beginner",
        focus: "Movement patterns and work capacity",
        warmup: [
            { exercise: "Jumping Jacks", duration: "2 min" },
            { exercise: "Arm Circles", reps: "20 forward, 20 back" },
            { exercise: "Leg Swings", reps: "10 each leg" },
            { exercise: "Cat-Cow", reps: "10" },
            { exercise: "Bodyweight Squats", reps: "10" }
        ],
        mainWorkout: [
            { exercise: "kneePushup", sets: 3, reps: "8-10", rest: "60s", notes: "Focus on form" },
            { exercise: "bodyweightSquat", sets: 3, reps: "15", rest: "60s", notes: "Full depth" },
            { exercise: "backpackRow", sets: 3, reps: "10", rest: "60s", notes: "Use light weight" },
            { exercise: "gluteBridge", sets: 3, reps: "15", rest: "60s", notes: "Squeeze glutes" },
            { exercise: "plank", sets: 3, reps: "20-30s", rest: "60s", notes: "Keep body straight" }
        ],
        cooldown: [
            { exercise: "Child's Pose", duration: "2 min" },
            { exercise: "Chest Stretch", duration: "1 min each side" },
            { exercise: "Hamstring Stretch", duration: "1 min each leg" },
            { exercise: "Deep Breathing", duration: "2 min" }
        ],
        checklist: [
            "Completed warm-up",
            "All exercises performed with good form",
            "Drank water during workout",
            "Completed cooldown",
            "Post-workout meal within 1 hour",
            "8+ hours of sleep tonight"
        ],
        motivation: "Day 1 is the hardest. You've already won by starting. Consistency beats intensity every time.",
        nutrition: "Eat a protein-rich meal within 1 hour post-workout. Eggs and beans are perfect.",
        water: "8 glasses minimum today",
        sleep: "Aim for 10 PM bedtime"
    },
    {
        day: 2,
        date: "July 18, 2026",
        name: "Active Recovery & Mobility",
        duration: "30 min",
        intensity: "Light",
        focus: "Recovery and movement quality",
        warmup: [
            { exercise: "Light Walking", duration: "5 min" },
            { exercise: "Arm Circles", reps: "20" },
            { exercise: "Hip Circles", reps: "10 each direction" }
        ],
        mainWorkout: [
            { exercise: "catCow", sets: 2, reps: "15", rest: "30s", notes: "Flow with breath" },
            { exercise: "worldGreatestStretch", sets: 2, reps: "5 each", rest: "30s", notes: "Deep stretch" },
            { exercise: "childPose", sets: 1, reps: "3 min", rest: "0s", notes: "Relax completely" },
            { exercise: "scapularPushup", sets: 2, reps: "15", rest: "60s", notes: "Shoulder health" },
            { exercise: "deadBug", sets: 2, reps: "10 each", rest: "60s", notes: "Core activation" }
        ],
        cooldown: [
            { exercise: "Full Body Stretch", duration: "5 min" },
            { exercise: "Deep Breathing", duration: "3 min" }
        ],
        checklist: [
            "Completed mobility routine",
            "Foam rolled if available",
            "Drank 3L water today",
            "Went for 20 min walk",
            "Practiced good posture all day",
            "In bed by 10 PM"
        ],
        motivation: "Recovery is when you grow. Respect the process.",
        nutrition: "Focus on vegetables and lean protein today. Recovery nutrition is key.",
        water: "3 liters minimum - recovery requires hydration",
        sleep: "Prioritize sleep - growth hormone peaks during deep sleep"
    },
    {
        day: 3,
        date: "July 19, 2026",
        name: "Full Body Foundation B",
        duration: "50 min",
        intensity: "Beginner",
        focus: "Building work capacity",
        warmup: [
            { exercise: "Jumping Jacks", duration: "2 min" },
            { exercise: "High Knees", duration: "1 min" },
            { exercise: "Arm Swings", reps: "20" },
            { exercise: "Leg Swings", reps: "10 each" },
            { exercise: "Torso Twists", reps: "20" }
        ],
        mainWorkout: [
            { exercise: "inclinePushup", sets: 3, reps: "10-12", rest: "60s", notes: "Use bed or chair" },
            { exercise: "splitSquat", sets: 3, reps: "10 each", rest: "60s", notes: "Balance focus" },
            { exercise: "towelRow", sets: 3, reps: "8-10", rest: "90s", notes: "Door anchor secure" },
            { exercise: "gluteBridge", sets: 3, reps: "20", rest: "60s", notes: "Single leg if easy" },
            { exercise: "bicycleCrunch", sets: 3, reps: "20 total", rest: "60s", notes: "Slow and controlled" },
            { exercise: "calfRaise", sets: 2, reps: "20", rest: "45s", notes: "Full range" }
        ],
        cooldown: [
            { exercise: "Child's Pose", duration: "2 min" },
            { exercise: "Quad Stretch", duration: "1 min each" },
            { exercise: "Chest Opener", duration: "2 min" },
            { exercise: "Deep Breathing", duration: "2 min" }
        ],
        checklist: [
            "Warm-up completed",
            "All sets and reps completed",
            "Form maintained throughout",
            "Hydrated during workout",
            "Cooldown completed",
            "Post-workout nutrition",
            "Sleep scheduled"
        ],
        motivation: "You're building the foundation. Every rep counts. Trust the process.",
        nutrition: "Carbs + protein post-workout. Rice and chicken/fish perfect.",
        water: "8 glasses - more if sweating",
        sleep: "Non-negotiable: 8 hours minimum"
    },
    {
        day: 4,
        date: "July 20, 2026",
        name: "Upper Body Focus",
        duration: "40 min",
        intensity: "Beginner-Intermediate",
        focus: "Push-pull balance",
        warmup: [
            { exercise: "Arm Circles", duration: "1 min" },
            { exercise: "Shoulder Rolls", reps: "10 each" },
            { exercise: "Cat-Cow", reps: "10" },
            { exercise: "Scapular Pushups", reps: "10" }
        ],
        mainWorkout: [
            { exercise: "kneePushup", sets: 4, reps: "10", rest: "60s", notes: "Add pause at bottom" },
            { exercise: "backpackRow", sets: 4, reps: "12", rest: "60s", notes: "Heavier pack" },
            { exercise: "pikePushup", sets: 3, reps: "6-8", rest: "90s", notes: "Shoulder focus" },
            { exercise: "floorPull", sets: 2, reps: "10 each", rest: "60s", notes: "Y-T-W positions" },
            { exercise: "plank", sets: 3, reps: "30-40s", rest: "60s", notes: "Add shoulder taps" },
            { exercise: "diamondPushup", sets: 2, reps: "6-8", rest: "90s", notes: "Knees if needed" }
        ],
        cooldown: [
            { exercise: "Chest Stretch", duration: "2 min" },
            { exercise: "Upper Back Stretch", duration: "2 min" },
            { exercise: "Tricep Stretch", duration: "1 min each" },
            { exercise: "Deep Breathing", duration: "2 min" }
        ],
        checklist: [
            "Completed warm-up",
            "All exercises with proper form",
            "Controlled tempo",
            "Water intake adequate",
            "Cooldown done",
            "Protein within 1 hour",
            "Rest day tomorrow planned"
        ],
        motivation: "Upper body strength is being built. Feel the muscles working.",
        nutrition: "Extra protein today - aim for 150g. Eggs, fish, beans.",
        water: "8+ glasses",
        sleep: "Muscles repair during sleep - prioritize it"
    },
    {
        day: 5,
        date: "July 21, 2026",
        name: "Lower Body & Core",
        duration: "45 min",
        intensity: "Beginner-Intermediate",
        focus: "Leg strength and core stability",
        warmup: [
            { exercise: "Jumping Jacks", duration: "2 min" },
            { exercise: "Leg Swings", reps: "15 each" },
            { exercise: "Hip Circles", reps: "10 each" },
            { exercise: "Bodyweight Squats", reps: "15" }
        ],
        mainWorkout: [
            { exercise: "bodyweightSquat", sets: 4, reps: "20", rest: "60s", notes: "Slow tempo" },
            { exercise: "bulgarianSplitSquat", sets: 3, reps: "8 each", rest: "90s", notes: "Use bed for foot" },
            { exercise: "gluteBridge", sets: 4, reps: "20", rest: "60s", notes: "Hold 2s at top" },
            { exercise: "calfRaise", sets: 3, reps: "25", rest: "45s", notes: "Slow and controlled" },
            { exercise: "legRaise", sets: 3, reps: "12", rest: "60s", notes: "Don't touch floor" },
            { exercise: "mountainClimber", sets: 3, reps: "30s", rest: "60s", notes: "Fast pace" },
            { exercise: "plank", sets: 2, reps: "45s", rest: "60s", notes: "Final burnout" }
        ],
        cooldown: [
            { exercise: "Pigeon Pose", duration: "2 min each" },
            { exercise: "Hamstring Stretch", duration: "2 min each" },
            { exercise: "Quad Stretch", duration: "1 min each" },
            { exercise: "Child's Pose", duration: "2 min" }
        ],
        checklist: [
            "Legs properly warmed up",
            "Full range of motion on squats",
            "Core engaged throughout",
            "Hydrated well",
            "Cooldown completed",
            "Post-workout meal",
            "Legs elevated after workout"
        ],
        motivation: "Leg day builds total body strength. Embrace the burn.",
        nutrition: "Carbs important today - yam, rice, plantain for recovery.",
        water: "Extra water - legs need hydration",
        sleep: "Growth hormone release during sleep builds legs"
    },
    {
        day: 6,
        date: "July 22, 2026",
        name: "Full Body Circuit",
        duration: "35 min",
        intensity: "Moderate",
        focus: "Work capacity and conditioning",
        warmup: [
            { exercise: "Light Jog in Place", duration: "3 min" },
            { exercise: "Dynamic Stretches", duration: "3 min" },
            { exercise: "Movement Prep", duration: "2 min" }
        ],
        mainWorkout: [
            { type: "circuit", rounds: 3, exercises: [
                { exercise: "inclinePushup", reps: "12", rest: "0s" },
                { exercise: "bodyweightSquat", reps: "20", rest: "0s" },
                { exercise: "backpackRow", reps: "12", rest: "0s" },
                { exercise: "gluteBridge", reps: "15", rest: "0s" },
                { exercise: "mountainClimber", reps: "30s", rest: "0s" },
                { exercise: "plank", reps: "30s", rest: "90s" }
            ]}
        ],
        cooldown: [
            { exercise: "Full Body Stretch", duration: "5 min" },
            { exercise: "Deep Breathing", duration: "3 min" }
        ],
        checklist: [
            "Circuit completed with minimal rest",
            "Form maintained despite fatigue",
            "Pushed through discomfort",
            "Hydrated during circuit",
            "Cooldown done",
            "Celebrated completing week 1",
            "Prepared for week 2"
        ],
        motivation: "Week 1 complete! You've proven you can commit. Now build the habit.",
        nutrition: "Refuel well - you've earned it. Balanced macros.",
        water: "Rehydrate - you sweated today",
        sleep: "Rest well - tomorrow is active recovery"
    },
    {
        day: 7,
        date: "July 23, 2026",
        name: "Active Recovery & Assessment",
        duration: "40 min",
        intensity: "Light",
        focus: "Recovery and baseline testing",
        warmup: [
            { exercise: "Light Walk", duration: "5 min" },
            { exercise: "Gentle Mobility", duration: "5 min" }
        ],
        mainWorkout: [
            { exercise: "catCow", sets: 2, reps: "15", rest: "30s", notes: "Gentle" },
            { exercise: "worldGreatestStretch", sets: 2, reps: "5 each", rest: "30s", notes: "Deep" },
            { type: "assessment", tests: [
                { name: "Max Push-ups", target: "Record your max with good form" },
                { name: "Max Bodyweight Squats", target: "Record your max" },
                { name: "Plank Hold", target: "Record max time" },
                { name: "Weight", target: "Weigh yourself" }
            ]}
        ],
        cooldown: [
            { exercise: "Full Body Stretch", duration: "10 min" },
            { exercise: "Meditation/Breathing", duration: "5 min" }
        ],
        checklist: [
            "Completed mobility work",
            "Recorded baseline measurements",
            "Took progress photos",
            "Reflected on week 1",
            "Planned week 2",
            "Prepped meals for week 2",
            "Early bedtime"
        ],
        motivation: "Rest is productive. You've completed your first week. That's huge.",
        nutrition: "Light, nutritious meals. Focus on vegetables and protein.",
        water: "3L - recovery requires hydration",
        sleep: "9 hours - full recovery"
    }
];
