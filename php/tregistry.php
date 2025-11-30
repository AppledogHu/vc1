<?php

// File to store registry data
$registryFile = 'tregistry.txt';

// Function to set data in the registry
function setRegistryData($file, $class, $key, $value) {
    // Read existing data
    $data = [
        'class' => [],
        'key' => [],
        'value' => [],
    ];

    if (file_exists($file)) {
        $contents = file_get_contents($file);
        $data = json_decode($contents, true);
    }

    // Set new data
    $data['class'][] = $class;
    $data['key'][] = $key;
    $data['value'][] = $value;

    // Write the updated data back to the file
    file_put_contents($file, json_encode($data));

    return true;
}

// Function to get data from the registry
function getRegistryData($file, $class, $key) {
    // Read existing data
    $data = [
        'class' => [],
        'key' => [],
        'value' => [],
    ];

    if (file_exists($file)) {
        $contents = file_get_contents($file);
        $data = json_decode($contents, true);
    }

    // Check if the requested data exists
    $result = [];
    for ($i = 0; $i < count($data['class']); $i++) {
        if (($class == '' || $data['class'][$i] == $class) && ($key == '' || $data['key'][$i] == $key)) {
            $result[] = $data['value'][$i];
        }
    }

    return $result;
}

// Function to delete data from the registry
function delRegistryData($file, $class, $key) {
    // Read existing data
    $data = [
        'class' => [],
        'key' => [],
        'value' => [],
    ];

    if (file_exists($file)) {
        $contents = file_get_contents($file);
        $data = json_decode($contents, true);
    }

    // Check if the requested data exists
    $deleted = false;
    for ($i = 0; $i < count($data['class']); $i++) {
        if (($class == '' || $data['class'][$i] == $class) && ($key == '' || $data['key'][$i] == $key)) {
            // Remove the data
            array_splice($data['class'], $i, 1);
            array_splice($data['key'], $i, 1);
            array_splice($data['value'], $i, 1);

            $deleted = true;
            break;
        }
    }

    // Write the updated data back to the file
    if ($deleted) {
        file_put_contents($file, json_encode($data));
    }

    return $deleted;
}

// Process the command and execute corresponding function
$cmd = isset($_REQUEST['cmd']) ? $_REQUEST['cmd'] : '';

if ($cmd == 'set') {
    $class = isset($_REQUEST['class']) ? $_REQUEST['class'] : '';
    $key = isset($_REQUEST['key']) ? $_REQUEST['key'] : '';
    $value = isset($_REQUEST['value']) ? $_REQUEST['value'] : '';

    if (!empty($class) && !empty($key) && isset($value)) {
        if (setRegistryData($registryFile, $class, $key, $value)) {
            echo json_encode(['success' => true, 'message' => 'Data set successfully']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to set data']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid parameters for "set" command']);
    }
} elseif ($cmd == 'get') {
    $class = isset($_REQUEST['class']) ? $_REQUEST['class'] : '';
    $key = isset($_REQUEST['key']) ? $_REQUEST['key'] : '';

    $result = getRegistryData($registryFile, $class, $key);
    if (!empty($result)) {
        echo json_encode(['success' => true, 'data' => $result]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Data not found']);
    }
} elseif ($cmd == 'del') {
    $class = isset($_REQUEST['class']) ? $_REQUEST['class'] : '';
    $key = isset($_REQUEST['key']) ? $_REQUEST['key'] : '';

    if (delRegistryData($registryFile, $class, $key)) {
        echo json_encode(['success' => true, 'message' => 'Data deleted successfully']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Data not found or failed to delete']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid command']);
}

?>