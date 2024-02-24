document.addEventListener("DOMContentLoaded", function () {
    // Add an event listener for the form submission
    const form = document.getElementById('workoutForm');
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission behavior
        generateWorkout(); // Call the function to generate the workout
    });
});

function generateWorkout() {
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const weight = Number(document.getElementById("weight").value);
    const fatPercentage = Number(document.getElementById("fatPercentage").value);
    const goal = Number(document.getElementById("goal").value);

    let selectedMuscle = ""; // Initialize selectedMuscle

    if (goal === 1) {
        selectedMuscle = document.getElementById("muscle").value;
    }

    const sets = '3 sets per exercise';
    const growthOrMaintenanceReps = '5 to 8 reps';
    const pumpReps1 = '2 x 12 to 15 and 1 x 20';

    const workoutDays = {
        Monday: [sets, growthOrMaintenanceReps, 'Bench Press', 'Shoulder Press', 'JM Press', 'Barbell Row', 'Lat Pulldown', 'Barbell Shrugs', 'Barbell Upright Rows', 'Barbell Face Pull', 'Barbell Bicep Curls'],
        Tuesday: [sets, growthOrMaintenanceReps, 'Squats', 'Stiff Leg Deadlifts', 'Adductor', 'Abductor', 'Hamstring Curls', 'Leg Extensions', 'Seated Calf Raises', 'Standing Calf Raises'],
        Wednesday: 'Rest',
        upperbodygrowthThursday: [pumpReps1, 'Bench Press', 'Incline Bench Press', 'Chest Fly', sets, growthOrMaintenanceReps, 'Shoulder Press', 'JM Press', 'Barbell Rows', 'Lat Pulldown', 'Barbell Shrugs', 'Barbell Face Pull', 'Barbell Upright Rows', 'Barbell Bicep Curls'],
        Thursdayfatloss: [pumpReps1, 'Bench Press', 'Incline Bench Press', 'Chest Fly', 'Shoulder Press', 'JM Press', 'Barbell Rows', 'Lat Pulldown', 'Barbell Shrugs', 'Barbell Face Pull', 'Barbell Upright Rows', 'Barbell Bicep Curls'],
        Thursday: [sets, growthOrMaintenanceReps, 'Bench Press', 'Incline Bench Press', 'Chest Fly', 'Shoulder Press', 'JM Press', 'Barbell Rows', 'Lat Pulldown', 'Barbell Shrugs', 'Barbell Face Pull', 'Barbell Upright Rows', 'Barbell Bicep Curls'],
        upperbodygrowthFriday: [sets, growthOrMaintenanceReps, 'Squats', 'Stiff Leg Deadlifts', 'Adductor', 'Abductor', 'Hamstring Curls', 'Leg Extensions', 'Seated Calf Raises', 'Standing Calf Raises'],
        Fridayfatloss: [pumpReps1, 'Squats', 'Stiff Leg Deadlifts', 'Adductor', 'Abductor', 'Hamstring Curls', 'Leg Extensions', 'Seated Calf Raises', 'Standing Calf Raises'],
        Friday: [sets, growthOrMaintenanceReps, 'Squats', 'Stiff Leg Deadlifts', 'Adductor', 'Abductor', 'Hamstring Curls', 'Leg Extensions', 'Seated Calf Raises', 'Standing Calf Raises'],
    };

    const upperbodymuscleGroups = {
        chest: ['Bench Press', 'Incline Dumbbell Press', 'Chest Fly'],
        back: ['Barbell Rows', 'Lat Pulldown', 'Barbell Shrugs'],
        shoulders: ['Shoulder Press', 'Barbell Front Raise', 'Barbell Upright Rows', 'Machine Lateral Raise', 'Barbell Face Pull', 'Reverse Pec Dec'],
        biceps: ['Barbell Bicep Curls', 'Machine Curls', 'Reverse Curls', 'Hammer Curls', 'Pronated Dumbbell Curls'],
        legs: ['Squats', 'Stiff Leg Deadlifts', 'Adductor', 'Abductor', 'Hamstring Curls', 'Leg Extensions', 'Seated Calf Raises', 'Standing Calf Raises'],
        triceps: ['JM press', 'Incline Overhead Extensions', 'Cable Overhead Extensions', 'Cable Underhand Extensions', 'Cable Push Downs'],
    };

    const lowerbodymuscleGroups = {
        glutes: ['Sumo squats','Reverse Lunges' , 'Abductors', 'Abductors', 'Adductors'],
        hamstrings: ['Stiff Leg Deadlifts', 'Seated Hamstring Curl', 'Lying Hamstring Curls'],
        quads: ['Squats', 'Bulgarian Squats','Leg Extensions'],
        calves: ['Standing Calf Raises', 'Seated Calf Raises'],
    };

    function generateupperbodyWorkout(muscle) {
        const workout = {
            Monday: [...workoutDays.Monday],
            Tuesday: [...workoutDays.Tuesday],
            Wednesday: workoutDays.Wednesday,
            Thursday: [...workoutDays.upperbodygrowthThursday],
            Friday: [...workoutDays.Friday],
        };

        workout.Thursday[0] = '3 sets per exercise';
        workout.Thursday[1] = '5 to 8 reps';

        const selectedupperbodyMuscleGroup = upperbodymuscleGroups[muscle.toLowerCase()];

        workout.Monday = [...workoutDays.Monday];
        workout.Tuesday = [...workoutDays.Tuesday];
        workout.Thursday = [pumpReps1, ...(selectedupperbodyMuscleGroup || []), sets, growthOrMaintenanceReps, ...(selectedupperbodyMuscleGroup || [])];
        workout.Friday = [...workoutDays.Friday];

        return workout;
    }

    function generatelowerbodyWorkout(muscle) {
        const workout = {
            Monday: [...workoutDays.Monday],
            Tuesday: [...workoutDays.Tuesday],
            Wednesday: workoutDays.Wednesday,
            Thursday: [...workoutDays.Thursday],
            Friday: [...workoutDays.Friday],
        };

        workout.Thursday[0] = '3 sets per exercise';
        workout.Thursday[1] = '5 to 8 reps';

        const selectedlowerbodyMuscleGroup = lowerbodymuscleGroups[muscle.toLowerCase()];

        workout.Monday = [...workoutDays.Monday];
        workout.Tuesday = [...workoutDays.Tuesday];
        workout.Thursday = [...workoutDays.Thursday];
        workout.Friday =  [pumpReps1, ...(selectedlowerbodyMuscleGroup || []), sets, growthOrMaintenanceReps, ...(selectedlowerbodyMuscleGroup || [])];

        return workout;
    }

    if (goal === 1 && fatPercentage < 25) {
        const userupperbodyWorkout = generateupperbodyWorkout(selectedMuscle);
        console.log(userupperbodyWorkout);

        const userlowerbodyWorkout = generatelowerbodyWorkout(selectedMuscle);
        console.log(userlowerbodyWorkout);

        // Calculate and display macronutrients
        const nonTrainingDayCarbs = weight * 0.5;
        const lightTrainingDayCarbs = weight * 1;
        const moderateTrainingDayCarbs = weight * 1.5;
        const heavyTrainingDayCarbs = weight * 2;

        const proteinPerDay = Math.round((weight - ((fatPercentage / 100) * weight)) * 0.9);
        const carbsPerDay = {
            'Rest Day': nonTrainingDayCarbs,
            '0 to 10 sets for the day': lightTrainingDayCarbs,
            '10 to 25 sets for the day': moderateTrainingDayCarbs,
            '25 plus sets for the day': heavyTrainingDayCarbs,
        };
        const fatPerDay = Math.round((weight - ((fatPercentage / 100) * weight)) * 0.5);

        // Display the output on the webpage
        const outputDiv = document.getElementById("output");
        outputDiv.innerHTML = `
            <h2>Generated Workout for ${firstName} ${lastName}</h2>
            <p>Selected Muscle: ${selectedMuscle}</p>
            <!-- Display more workout details and macronutrients as needed -->
            <p>Grams of Protein Per Day: ${proteinPerDay}</p>
            <p>Grams of Carbs Per Day:</p>
            <ul>
                <li>Rest Day: ${carbsPerDay['Rest Day']}</li>
                <li>0 to 10 sets for the day: ${carbsPerDay['0 to 10 sets for the day']}</li>
                <li>10 to 25 sets for the day: ${carbsPerDay['10 to 25 sets for the day']}</li>
                <li>25 plus sets for the day: ${carbsPerDay['25 plus sets for the day']}</li>
            </ul>
            <p>Grams of Fat Per Day: ${fatPerDay}</p>
        `;
    } else {
        console.log("Unsupported goal or no muscle selected for muscle growth.");
    }

    const fatlossWorkout = {}; // Initialize the workout object

    if (goal === 2 && fatPercentage >= 25) {
        fatlossWorkout.Monday = [...workoutDays.Monday];
        fatlossWorkout.Tuesday = [...workoutDays.Tuesday];
        fatlossWorkout.Wednesday = [...workoutDays.Wednesday];
        fatlossWorkout.Thursday = [...workoutDays.Thursdayfatloss];
        fatlossWorkout.Friday = [...workoutDays.Fridayfatloss];
    } else if (goal === 2 && fatPercentage <= 25) {
        console.log(fatlossWorkout);
    } else if (goal === 1 && fatPercentage >= 25) {
        alert("It is healthier to lose weight first and get your fat under 25 percent and then put on muscle");
    }

    const maintenanceWorkout = {};

    if (goal === 3) {
        maintenanceWorkout.Monday = [...workoutDays.Monday];
        maintenanceWorkout.Tuesday = [...workoutDays.Tuesday];
        maintenanceWorkout.Wednesday = [...workoutDays.Wednesday];
        maintenanceWorkout.Thursday = [...workoutDays.Thursday];
        maintenanceWorkout.Friday = [...workoutDays.Friday];
    }
    console.log(maintenanceWorkout);
}
