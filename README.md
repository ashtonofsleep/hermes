# Hermes

Link management platform

---

## Description

Hermes purpose is to manage and track links. It acts as a proxy between a user and target url.

### Data collected

- Users IP address
- UserAgent data
- Host / origin
- Timestamp

## Flow

This acts as a central API and depends on the data provided and requested by it's workers.

```
client <==> \
client <==> | <==> hermes worker node <==> \
client <==> /          + redis             \
                                           \        database                          
client <==> \                              \           ||                           
client <==> | <==> hermes worker node <==> | <==> hermes node <==> prometheus (...)
client <==> /          + redis             /           ||
                                           /          redis
client <==> \                              /
client <==> | <==> hermes worker node <==> /
client <==> /          + redis
```

### Cache

There are 2 cache levels in place. 
- Level 1 - Worker integrated Redis
- Level 2 - Supervisor integrated Redis

### Relations

#### Client - worker level

Worker node redirects client to the target url using cached Redis records or by making a request to the Hermes instance.

#### Worker - Supervisor level

Workers send client data to supervisors for tracking data database insertion or request resource data if not cached.

#### Hermes - Prometheus

Hermes can be controlled independently or by using an integrated Hermes service contained in the Prometheus central server.

## Technology stack

- Express.js - REST
- Mongoose (MongoDB) - Database interface
- Redis - Cache