package ch.ipt.hackathon.producer;

import com.google.common.util.concurrent.RateLimiter;
import org.apache.commons.lang3.RandomStringUtils;
import org.apache.kafka.clients.producer.KafkaProducer;
import org.apache.kafka.clients.producer.Producer;
import org.apache.kafka.clients.producer.ProducerRecord;
import ch.ipt.hackathon.model.*;

import java.util.*;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

public class SensorProducer {

    //we'll produce to these topics
    public static final String TOPIC_SENSOR = "sensor";

    //these settings control the probabilities that an event is produced
    //you don't need to change them, unless you want to
    static private Random random = new Random();
    public static final double EVENTS_PER_SECOND = 10000.0;

    //the kafka producer!
    static private Producer producer;

    static final RateLimiter rateLimiter = RateLimiter.create(EVENTS_PER_SECOND);

    static volatile boolean running = true;

    static private final SensorType[] sensorTypes = SensorType.values();

    public static void main(String[] args) {
        setUpProducer();
        addShutdownHook();
        produce();
    }

    private static void produce() {
        int limit = Integer.MAX_VALUE;
        while (running && limit-- > 0) {
            rateLimiter.acquire((int)  Math.abs(randomGaussian(100,20)));

            Sensor sensor = getRandomSensor();

            ProducerRecord<String, Sensor> sensorRecord = getSensorRecord(sensor);
            producer.send(sensorRecord);
            System.out.println("SENSOR " + sensorRecord);



        }

    }

    private static void addShutdownHook() {
        final Thread mainThread = Thread.currentThread();
        Runtime.getRuntime().addShutdownHook(new Thread(() -> {
            running = false;
        }));
    }

    private static ProducerRecord<String, Sensor> getSensorRecord(Sensor sensor) {
        return new ProducerRecord<>(
                TOPIC_SENSOR,
                UUID.randomUUID().toString(),
                sensor);
    }

    private static double randomGaussian(double mean, double standardDeviation) {
        return Math.max(0.0, random.nextGaussian() * standardDeviation + mean);
    }

    private static Sensor getRandomSensor() {
        int pick = new Random().nextInt(sensorTypes.length);

        return Sensor.newBuilder()
                .setTimestamp(new Date().getTime())
                .setCustomerId(random.nextInt(1000000))
                .setCarId(UUID.randomUUID().toString())
                .setSensorType(sensorTypes[pick].toString().toLowerCase())
                .setSensorReading("[" + random.nextFloat() + "," + random.nextFloat() + "]")
                .build();
    }

    private static void setUpProducer() {
        producer = new KafkaProducer(GlobalConfiguration.getProducerCOnfig());
    }

}
